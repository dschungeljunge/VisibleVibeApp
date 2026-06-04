'use client';

import React, { useMemo, useCallback } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  Connection, 
  Edge,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSkillTree } from '../context/SkillTreeContext';
import { CustomNode } from './CustomNode';
import { Sparkles, Layers, Info } from 'lucide-react';

const nodeTypes = {
  customNode: CustomNode,
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
    adminMode,
    saveEdge,
    deleteEdge
  } = useSkillTree();

  const activeProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId) || null;
  }, [projects, selectedProjectId]);

  // Format nodes for React Flow
  const flowNodes = useMemo(() => {
    return nodes.map(node => {
      // Check if node is filtered out
      // We don't remove them from canvas to keep the graph structure intact, but we can dim them
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
        // In React Flow, nodes are draggable. We only allow dragging in Admin Mode!
        draggable: adminMode,
      };
    });
  }, [nodes, adminMode, completionStates]);

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
    setSelectedNodeId(node.id);
  }, [setSelectedNodeId]);

  // Handle Dragging Nodes (Position updates in database)
  const { saveNode } = useSkillTree();
  const onNodeDragStop = useCallback(async (_: any, node: any) => {
    if (!adminMode) return;
    try {
      const originalNode = nodes.find(n => n.id === node.id);
      if (!originalNode) return;
      
      // Update coordinates
      await saveNode(node.id, {
        position_x: Math.round(node.position.x),
        position_y: Math.round(node.position.y),
      }, 'Knoten-Position verschoben');
    } catch (err: any) {
      console.error('Failed to save dragged position:', err);
    }
  }, [adminMode, nodes, saveNode]);

  // Create new connections in Admin Mode
  const onConnect = useCallback(async (connection: Connection) => {
    if (!adminMode || !connection.source || !connection.target) return;
    try {
      const type = prompt(
        'Verbindungstyp eingeben:\n1: prerequisite (Voraussetzung)\n2: leads_to (Führt zu)\n3: required_for_project (Projekt-Bestandteil)',
        'prerequisite'
      );
      
      if (!type) return;
      
      let relation_type: 'prerequisite' | 'leads_to' | 'required_for_project' = 'prerequisite';
      if (type === '1' || type === 'prerequisite') relation_type = 'prerequisite';
      else if (type === '2' || type === 'leads_to') relation_type = 'leads_to';
      else if (type === '3' || type === 'required_for_project') relation_type = 'required_for_project';

      await saveEdge({
        source_node_id: connection.source,
        target_node_id: connection.target,
        relation_type
      });
      
      alert('Verbindung erstellt!');
    } catch (err: any) {
      alert(err.message || 'Fehler beim Erstellen der Verbindung.');
    }
  }, [adminMode, saveEdge]);

  // Delete connections on double click in Admin Mode
  const onEdgeDoubleClick = useCallback(async (_: any, edge: Edge) => {
    if (!adminMode) return;
    if (confirm(`Verbindung zwischen ${edge.source} und ${edge.target} löschen?`)) {
      try {
        await deleteEdge(edge.id);
        alert('Verbindung gelöscht.');
      } catch (err: any) {
        alert(err.message);
      }
    }
  }, [adminMode, deleteEdge]);

  return (
    <div className="relative h-full w-full bg-[#040812] overflow-hidden">
      {/* Background Stages Grid */}
      <div className="pointer-events-none absolute inset-0 flex h-full w-full">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div 
            key={idx} 
            className="flex h-full flex-1 flex-col border-r border-white/3 last:border-0"
          >
            {/* Stage Numbers Header */}
            <div className="flex h-12 items-center justify-center bg-slate-950/20 text-center border-b border-white/3">
              <span className="text-xs font-extrabold tracking-widest text-slate-500">
                STUFE {idx + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

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
          {adminMode && (
            <li className="font-semibold text-amber-400">
              • Admin: Knoten ziehen zum Bewegen. Doppelklick Kante zum Löschen.
            </li>
          )}
        </ul>
      </div>

      {/* Canvas */}
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onNodeDragStop={onNodeDragStop}
        onConnect={onConnect}
        onEdgeDoubleClick={onEdgeDoubleClick}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
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
