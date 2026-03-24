import { useState, useRef, useEffect } from 'react';
import './Tooltip.scss';

const Tooltip = ({
  children,
  content,
  position = 'top',
  trigger = 'hover',
  delay = 300,
  disabled = false,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [calculatedPosition, setCalculatedPosition] = useState(position);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current && triggerRef.current) {
      updatePosition();
    }
  }, [isVisible]);

  const updatePosition = () => {
    if (!tooltipRef.current || !triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let newPosition = position;

    // Check if tooltip would go out of viewport and adjust
    switch (position) {
      case 'top':
        if (triggerRect.top - tooltipRect.height < 0) {
          newPosition = 'bottom';
        }
        break;
      case 'bottom':
        if (triggerRect.bottom + tooltipRect.height > viewport.height) {
          newPosition = 'top';
        }
        break;
      case 'left':
        if (triggerRect.left - tooltipRect.width < 0) {
          newPosition = 'right';
        }
        break;
      case 'right':
        if (triggerRect.right + tooltipRect.width > viewport.width) {
          newPosition = 'left';
        }
        break;
    }

    setCalculatedPosition(newPosition);
  };

  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  const handleFocus = () => {
    if (trigger === 'focus' || trigger === 'hover') {
      showTooltip();
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus' || trigger === 'hover') {
      hideTooltip();
    }
  };

  const getTooltipStyles = () => {
    if (!isVisible || !triggerRef.current) return {};

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current?.getBoundingClientRect() || { width: 0, height: 0 };

    const styles = {
      position: 'absolute',
      zIndex: 800,
    };

    switch (calculatedPosition) {
      case 'top':
        styles.bottom = `${window.innerHeight - triggerRect.top + 8}px`;
        styles.left = `${triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2}px`;
        break;
      case 'bottom':
        styles.top = `${triggerRect.bottom + 8}px`;
        styles.left = `${triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2}px`;
        break;
      case 'left':
        styles.right = `${window.innerWidth - triggerRect.left + 8}px`;
        styles.top = `${triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2}px`;
        break;
      case 'right':
        styles.left = `${triggerRect.right + 8}px`;
        styles.top = `${triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2}px`;
        break;
    }

    return styles;
  };

  return (
    <div
      ref={triggerRef}
      className={`tooltip-wrapper ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      {children}
      
      {isVisible && !disabled && (
        <div
          ref={tooltipRef}
          className={`tooltip tooltip-${calculatedPosition}`}
          style={getTooltipStyles()}
          role="tooltip"
        >
          <div className="tooltip-content">
            {content}
          </div>
          <div className={`tooltip-arrow tooltip-arrow-${calculatedPosition}`} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
