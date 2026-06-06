'use client';

import React, { useMemo, useCallback } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  MarkerType,
  NodeProps
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSkillTree } from '../context/SkillTreeContext';
import { CustomNode } from './CustomNode';
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
      {/* Vertical line */}
      <div className="w-px bg-white/5" style={{ height: 2000 }} />
      {/* Label pill */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center"
        style={{ height: 40 }}
      >
        <span className="rounded-full border border-white/8 bg-slate-950/60 px-3 py-1 text-[10px] font-extrabold tracking-widest text-slate-500 uppercase backdrop-blur-md">
          {(data as any).label}
        </span>
      </div>
    </div>
  );
};

const nodeTypes = {
  customNode: CustomNode,
  stageLabel: StageLabelNode,
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

  const activeProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId) || null;
  }, [projects, selectedProjectId]);

  // Build stage label nodes (one per stage column)
  // extent: 'parent' would limit them, instead we use `extent` as fixed positions
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

  // Format nodes for React Flow
  const flowNodes = useMemo(() => {
    const skillNodes = nodes.map(node => {
      const state = completionStates[node.id] || 'locked';
      
      return {
        id: node.id,
        type: 'customNode',
        position: { x: node.position_x, y: node.position_y },
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
    return [...stageLabelNodes, ...skillNodes];
  }, [nodes, completionStates, stageLabelNodes]);

  // Format edges for React Flow with custom dynamic styling
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

      // Base style
      let strokeColor = 'rgba(255, 255, 255, 0.12)';
      let strokeWidth = 2.5;
      let animated = false;
      let zIndex = 1;

      // Styling priority:
      // 1. Selected Project is active
      if (selectedProjectId) {
        if (isEdgeInActiveProject) {
          strokeColor = '#f59e0b'; // Gold amber
          strokeWidth = 3.5;
          animated = true;
          zIndex = 10;
        } else {
          // Dim other edges
          strokeColor = 'rgba(255, 255, 255, 0.03)';
          strokeWidth = 1.5;
        }
      } 
      // 2. Hovered Node path highlight
      else if (hoveredNodeId) {
        if (isPathHovered) {
          strokeColor = isSourceHovered ? '#60a5fa' : '#f43f5e'; // blue for downstream, rose for upstream
          strokeWidth = 4;
          animated = true;
          zIndex = 10;
        } else {
          // Dim other edges
          strokeColor = 'rgba(255, 255, 255, 0.05)';
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
          width: 15,
          height: 15,
          color: strokeColor,
        },
      };
    });
  }, [edges, hoveredNodeId, selectedProjectId, activeProject]);

  const onNodeClick = useCallback((_: any, node: any) => {
    // Ignore clicks on stage label nodes
    if (node.id.startsWith('stage-label-')) return;
    setSelectedNodeId(node.id);
  }, [setSelectedNodeId]);

  return (
    <div className="relative h-full w-full bg-[#040812] overflow-hidden">

      {/* Floating Instructions */}
      <div className="pointer-events-none absolute top-4 left-4 z-10 max-w-xs space-y-2 rounded-xl border border-white/5 bg-slate-950/70 p-3 backdrop-blur-md">
        <h4 className="flex items-center space-x-1.5 text-xs font-bold text-white">
          <Info className="h-3.5 w-3.5 text-rose-400" />
          <span>Navigationshilfe</span>
        </h4>
        <ul className="text-[10px] text-slate-400 space-y-1">
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
        <Background color="#1e293b" gap={40} size={1} />
        <Controls 
          showInteractive={false}
          className="!bg-slate-900 !border-white/10 !text-white [&>button]:!border-white/5 [&>button]:hover:!bg-white/5 [&>svg]:!fill-white" 
        />
        <MiniMap 
          nodeColor={(node) => {
            if (node.id.startsWith('stage-label-')) return 'transparent';
            const cat = node.data?.category;
            if (cat === 'Learning Design') return '#8b5cf6';
            if (cat === 'UX Design') return '#f43f5e';
            if (cat === 'AI Design') return '#10b981';
            if (cat === 'Data Design') return '#3b82f6';
            return '#eab308'; // Product
          }}
          maskColor="rgba(8, 12, 24, 0.7)"
          className="!bg-slate-950 !border-white/10"
        />
      </ReactFlow>

      {/* Floating Canvas Legend */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-2.5 rounded-xl border border-white/5 bg-slate-950/70 p-3 backdrop-blur-md">
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_8px_#8b5cf6]" />
          <span className="text-[9px] font-bold text-slate-400 uppercase">Learning Design</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
          <span className="text-[9px] font-bold text-slate-400 uppercase">UX Design</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <span className="text-[9px] font-bold text-slate-400 uppercase">AI Design</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          <span className="text-[9px] font-bold text-slate-400 uppercase">Data Design</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_#eab308]" />
          <span className="text-[9px] font-bold text-slate-400 uppercase">Product Design</span>
        </div>
      </div>
    </div>
  );
};
export default SkillTreeCanvas;
