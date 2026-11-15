/**
 * useDragDrop Hook — The Lost Space Archive
 * Accessible drag and drop with keyboard fallback
 */

import { useState, useCallback, useRef } from 'react';

export interface DragDropState {
  draggedItemId: string | null;
  dropTargetId: string | null;
  isDragging: boolean;
}

export interface UseDragDropOptions<T> {
  getItemId: (item: T) => string;
  onDrop: (itemId: string, targetId: string) => void;
  onDragStart?: (itemId: string) => void;
  onDragEnd?: () => void;
  keyboardMode?: boolean;
}

export function useDragDrop<T>({
  getItemId,
  onDrop,
  onDragStart,
  onDragEnd,
  keyboardMode = false,
}: UseDragDropOptions<T>) {
  const [state, setState] = useState<DragDropState>({
    draggedItemId: null,
    dropTargetId: null,
    isDragging: false,
  });

  const draggedItemRef = useRef<T | null>(null);
  const keyboardSelectedRef = useRef<string | null>(null);

  // Mouse/Touch drag handlers
  const handleDragStart = useCallback(
    (e: React.DragEvent, item: T) => {
      const itemId = getItemId(item);
      draggedItemRef.current = item;
      setState({
        draggedItemId: itemId,
        dropTargetId: null,
        isDragging: true,
      });
      onDragStart?.(itemId);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', itemId);
    },
    [getItemId, onDragStart]
  );

  const handleDragEnd = useCallback(
    () => {
      setState({
        draggedItemId: null,
        dropTargetId: null,
        isDragging: false,
      });
      draggedItemRef.current = null;
      onDragEnd?.();
    },
    [onDragEnd]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, targetId: string) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setState(prev => ({ ...prev, dropTargetId: targetId }));
    },
    []
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      // Only clear if leaving the actual target
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setState(prev => ({ ...prev, dropTargetId: null }));
      }
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent, targetId: string) => {
      e.preventDefault();
      const itemId = e.dataTransfer.getData('text/plain') || state.draggedItemId;
      if (itemId) {
        onDrop(itemId, targetId);
      }
      setState({
        draggedItemId: null,
        dropTargetId: null,
        isDragging: false,
      });
      draggedItemRef.current = null;
    },
    [state.draggedItemId, onDrop]
  );

  // Keyboard fallback handlers
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, item: T) => {
      if (!keyboardMode) return;

      const itemId = getItemId(item);

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (keyboardSelectedRef.current === itemId) {
          // Already selected, now need to select target
          // This will be handled by the drop target
        } else {
          // Select this item
          keyboardSelectedRef.current = itemId;
          setState(prev => ({ ...prev, draggedItemId: itemId, isDragging: true }));
          onDragStart?.(itemId);
        }
      } else if (e.key === 'Escape') {
        keyboardSelectedRef.current = null;
        setState({
          draggedItemId: null,
          dropTargetId: null,
          isDragging: false,
        });
        onDragEnd?.();
      }
    },
    [getItemId, keyboardMode, onDragStart, onDragEnd]
  );

  const handleTargetKeyDown = useCallback(
    (e: React.KeyboardEvent, targetId: string) => {
      if (!keyboardMode) return;

      if ((e.key === 'Enter' || e.key === ' ') && keyboardSelectedRef.current) {
        e.preventDefault();
        onDrop(keyboardSelectedRef.current, targetId);
        keyboardSelectedRef.current = null;
        setState({
          draggedItemId: null,
          dropTargetId: null,
          isDragging: false,
        });
        onDragEnd?.();
      } else if (e.key === 'Escape') {
        keyboardSelectedRef.current = null;
        setState({
          draggedItemId: null,
          dropTargetId: null,
          isDragging: false,
        });
        onDragEnd?.();
      }
    },
    [keyboardMode, onDrop, onDragEnd]
  );

  // Touch handlers for mobile
  const touchStartRef = useRef<{ x: number; y: number; itemId: string } | null>(null);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, item: T) => {
      if (!keyboardMode) return;
      const touch = e.touches[0];
      const itemId = getItemId(item);
      touchStartRef.current = { x: touch.clientX, y: touch.clientY, itemId };
    },
    [getItemId, keyboardMode]
  );

  const handleTouchMove = useCallback(
    () => {
      if (!touchStartRef.current || !keyboardMode) return;
      // Could implement touch drag preview here
    },
    [keyboardMode]
  );

  const handleTouchEnd = useCallback(
    () => {
      touchStartRef.current = null;
    },
    []
  );

  return {
    state,
    handlers: {
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      onKeyDown: handleKeyDown,
      onTargetKeyDown: handleTargetKeyDown,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    get keyboardSelected() {
      return keyboardSelectedRef.current;
    },
  };
}

/**
 * Hook for click-to-select (keyboard accessible alternative to drag/drop)
 */
export function useClickToSelect<T>({
  getItemId,
  onSelect,
  onPlace,
}: {
  getItemId: (item: T) => string;
  onSelect: (itemId: string) => void;
  onPlace: (itemId: string, targetId: string) => void;
}) {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleItemClick = useCallback(
    (item: T) => {
      const itemId = getItemId(item);
      if (selectedItemId === itemId) {
        setSelectedItemId(null);
      } else {
        setSelectedItemId(itemId);
        onSelect(itemId);
      }
    },
    [getItemId, selectedItemId, onSelect]
  );

  const handleTargetClick = useCallback(
    (targetId: string) => {
      if (selectedItemId) {
        onPlace(selectedItemId, targetId);
        setSelectedItemId(null);
      }
    },
    [selectedItemId, onPlace]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, item: T) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleItemClick(item);
      } else if (e.key === 'Escape') {
        setSelectedItemId(null);
      }
    },
    [handleItemClick]
  );

  const handleTargetKeyDown = useCallback(
    (e: React.KeyboardEvent, targetId: string) => {
      if ((e.key === 'Enter' || e.key === ' ') && selectedItemId) {
        e.preventDefault();
        onPlace(selectedItemId, targetId);
        setSelectedItemId(null);
      } else if (e.key === 'Escape') {
        setSelectedItemId(null);
      }
    },
    [selectedItemId, onPlace]
  );

  return {
    selectedItemId,
    handlers: {
      onItemClick: handleItemClick,
      onTargetClick: handleTargetClick,
      onItemKeyDown: handleKeyDown,
      onTargetKeyDown: handleTargetKeyDown,
    },
  };
}