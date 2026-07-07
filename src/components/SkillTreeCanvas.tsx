'use client';

import React, { useMemo, useCallback } from 'react';
import { 
  ReactFlow, 
  Background, 
  BackgroundVariant,
  Controls, 
  MiniMap, 
  MarkerType,
  NodeProps,
  useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSkillTree } from '../context/SkillTreeContext';
import { CustomNode } from './CustomNode';
import { PopupNode } from './PopupNode';
import { Info } from 'lucide-react';

// Stage label column width matches the X step between node levels (380px)
const STAGE_STEP_X = 380;
const STAGE_START_X = 80; // first node X (kickoff)
const NUM_STAGES = 9;

// Special node type for stage column headers rendered in canvas space
const StageLabelNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div
      style={{ width: STAGE_STEP_X, pointerEvents: 'none', userSelect: 'none' }}
      className="flex flex-col items-center"
    >
      {/* Vertical line extending down through the canvas */}
      <div className="w-px bg-slate-100" style={{ height: 3000 }} />
      {/* Label pill */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center"
        style={{ height: 40 }}
      >
        <span className="rounded-full border border-slate-200 bg-slate-50/90 px-3 py-1 text-[10px] font-extrabold tracking-widest text-slate-500 uppercase backdrop-blur-sm shadow-sm">
          {(data as any).label}
        </span>
      </div>
    </div>
  );
};

const nodeTypes = {
  customNode: CustomNode,
  stageLabel: StageLabelNode,
  popupNode: PopupNode,
};

export const SkillTreeCanvas: React.FC = () => {
  const {
    nodes,
    edges,
    completionStates,
    selectedNodeId,
    setSelectedNodeId,
    hoveredNodeId,
    selectedProjectId,
    projects,
  } = useSkillTree();

  const { setCenter } = useReactFlow();

  const activeProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId) || null;
  }, [projects, selectedProjectId]);

  // Build stage label nodes (one per stage column)
  const stageLabelNodes = useMemo(() => {
    return Array.from({ length: NUM_STAGES }, (_, idx) => ({
      id: `stage-label-${idx + 1}`,
      type: 'stageLabel',
      position: { x: STAGE_START_X + idx * STAGE_STEP_X - STAGE_STEP_X / 2, y: -90 },
      data: { label: `Stufe ${idx + 1}` },
      draggable: false,
      selectable: false,
      focusable: false,
      zIndex: -1,
      // Exclude from fitView bounds
      measured: { width: 0, height: 0 },
    }));
  }, []);

  // For fitView: only fit to skill nodes, not stage label nodes
  const skillNodeIds = useMemo(() => {
    return nodes.map(n => ({ id: n.id }));
  }, [nodes]);

  // Format nodes for React Flow, dynamically scaling node positioning to resolve overlapping issues
  const flowNodes = useMemo(() => {
    const skillNodes = nodes.map(node => {
      return {
        id: node.id,
        type: 'customNode',
        position: { x: node.position_x, y: node.position_y * 0.95 }, // Compact vertical layout
        data: {
          title: node.title,
          category: node.category,
          level: node.level,
          is_milestone: node.is_milestone,
          summary: node.summary,
        },
        draggable: false,
      };
    });

    // Check if there is a selected node. If yes, dynamically append the popup node!
    const selectedNode = nodes.find(n => n.id === selectedNodeId);
    const popupNode = selectedNode ? [{
      id: 'node-popup',
      type: 'popupNode',
      // Position it to the right of the selected node
      position: { x: selectedNode.position_x + 280, y: selectedNode.position_y * 0.95 - 10 },
      data: {
        nodeId: selectedNode.id,
        title: selectedNode.title,
        category: selectedNode.category,
        summary: selectedNode.summary,
        practice_task: selectedNode.practice_task,
        quality_criteria: selectedNode.quality_criteria,
      },
      draggable: false,
      zIndex: 100, // Make sure it sits on top of everything
    }] : [];

    return [...stageLabelNodes, ...skillNodes, ...popupNode];
  }, [nodes, stageLabelNodes, selectedNodeId]);

  // Format edges for React Flow with custom dynamic styling matching the new light theme
  const flowEdges = useMemo(() => {
    return edges.map(edge => {
      const isSourceHovered = hoveredNodeId === edge.source_node_id;
      const isTargetHovered = hoveredNodeId === edge.target_node_id;
      const isPathHovered = isSourceHovered || isTargetHovered;
      
      // Check if edge is part of the active project path
      const isEdgeInActiveProject = activeProject
        ? activeProject.required_node_ids.includes(edge.source_node_id) &&
          activeProject.required_node_ids.includes(edge.target_node_id)
        : false;

      // Base style optimized for white background
      let strokeColor = '#cbd5e1';
      let strokeWidth = 2.2;
      let animated = false;
      let zIndex = 1;

      // Styling priority:
      // 1. Selected Project is active
      if (selectedProjectId) {
        if (isEdgeInActiveProject) {
          strokeColor = '#d97706'; // Gold amber
          strokeWidth = 3.2;
          animated = true;
          zIndex = 10;
        } else {
          // Dim other edges on white background
          strokeColor = '#f1f5f9';
          strokeWidth = 1.2;
        }
      } 
      // 2. Hovered Node path highlight
      else if (hoveredNodeId) {
        if (isPathHovered) {
          strokeColor = isSourceHovered ? '#3b82f6' : '#f43f5e'; // blue for downstream, rose for upstream
          strokeWidth = 3.5;
          animated = true;
          zIndex = 10;
        } else {
          // Dim other edges
          strokeColor = '#f1f5f9';
        }
      }

      return {
        id: edge.id,
        source: edge.source_node_id,
        target: edge.target_node_id,
        animated,
        style: { 
          stroke: strokeColor, 
          strokeWidth,
          transition: 'stroke 0.3s, stroke-width 0.3s'
        },
        zIndex,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 14,
          height: 14,
          color: strokeColor,
        },
      };
    });
  }, [edges, hoveredNodeId, selectedProjectId, activeProject]);

  const onNodeClick = useCallback((_: any, node: any) => {
    // Ignore clicks on stage label nodes and popup nodes
    if (node.id.startsWith('stage-label-') || node.id === 'node-popup') return;
    setSelectedNodeId(node.id);

    // Zoom and center camera automatically on the clicked node + popup area
    const nodeWidth = 256;
    const nodeHeight = 84;
    // Offset horizontal center by 140px to center both the card and the popup on the screen
    const centerX = node.position.x + nodeWidth / 2 + 140;
    const centerY = node.position.y + nodeHeight / 2;
    
    setCenter(centerX, centerY, { zoom: 1.15, duration: 800 });
  }, [setSelectedNodeId, setCenter]);

  return (
    <div className="relative h-full w-full bg-white overflow-hidden">

      {/* Floating Instructions */}
      <div className="pointer-events-none absolute top-4 left-4 z-10 max-w-xs space-y-2 rounded-xl border border-slate-200 bg-white/95 p-3.5 shadow-lg backdrop-blur-sm">
        <h4 className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
          <Info className="h-3.5 w-3.5 text-rose-500" />
          <span>Navigationshilfe</span>
        </h4>
        <ul className="text-[10px] text-slate-500 space-y-1 font-medium">
          <li>• Zoom per Mausrad. Ziehen zum Verschieben.</li>
          <li>• Hover über Knoten zeigt Abhängigkeiten.</li>
          <li>• Klick auf Knoten öffnet Details &amp; Lernaufgaben.</li>
        </ul>
      </div>

      {/* Canvas */}
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.08, minZoom: 0.08, nodes: skillNodeIds }}
        minZoom={0.08}
        maxZoom={1.5}
        className="h-full w-full"
      >
        <Background color="#cbd5e1" gap={30} size={1} variant={BackgroundVariant.Dots} />
        <Controls 
          showInteractive={false}
          className="!bg-white !border-slate-200 !text-slate-700 [&>button]:!border-slate-100 [&>button]:hover:!bg-slate-50 [&>svg]:!fill-slate-600 shadow-md" 
        />
        <MiniMap 
          nodeColor={(node) => {
            if (node.id.startsWith('stage-label-')) return 'transparent';
            if (node.id === 'node-popup') return 'transparent';
            const cat = node.data?.category;
            if (cat === 'Learning Design') return '#8b5cf6';
            if (cat === 'UX Design') return '#f43f5e';
            if (cat === 'AI Design') return '#10b981';
            if (cat === 'Data Design') return '#3b82f6';
            return '#eab308'; // Product
          }}
          maskColor="rgba(241, 245, 249, 0.45)"
          className="!bg-white !border-slate-200 shadow-md"
        />
      </ReactFlow>

      {/* Floating Canvas Legend */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-2.5 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur-sm">
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_8px_#8b5cf6]" />
          <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Learning Design</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
          <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">UX Design</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">AI Design</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Data Design</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_#eab308]" />
          <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Product Design</span>
        </div>
      </div>
    </div>
  );
};
export default SkillTreeCanvas;
