// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { search } from 'fast-fuzzy';
import { Menu, MenuItem } from '@blueprintjs/core';

export type IMenuItem = {
  title: string,
  type: string,
  icon?: string,
};

const menuHeight = 200;
type MenuContainerProps = { top?: string, left?: string, opacity?: number };
const MenuContainer = styled.div`
  position: absolute;
  top: ${({ top }: MenuContainerProps) => top || '-10000px'};
  left: ${({ left }: MenuContainerProps) => left || '-10000px'};
  z-index: 100;

  opacity: ${({ opacity }) => opacity || 0};
  transition: opacity 0.25s;

  ul.bp3-menu {
    max-height: ${menuHeight}px;
    overflow-y: auto;
  }
`;

export type HoverMenuProps = {
  open?: boolean,
  mountPoint: string,
  items: IMenuItem[],
  position: number[],
};
type HoverMenuState = {
  filter: string,
  items: IMenuItem[],
  position: number[],
};
export default class HoverMenu extends Component<
  HoverMenuProps,
  HoverMenuState,
> {
  state = {
    filter: '',
    items: [],
    position: [0, 0],
  };

  static getDerivedStateFromProps(nextProps: HoverMenuProps) {
    // stop update menu position when it is open, so it won't follow cursor around
    if (nextProps.open) {
      return null;
    }
    return { position: nextProps.position, items: nextProps.items };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleSearch, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleSearch, false);
  }

  menuRef: HTMLDivElement | null = null;

  /**
   * When a mark button is clicked, toggle the current mark.
   */
  onClickMark = (item: IMenuItem, event: SyntheticEvent<*>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  /**
   * Render a mark-toggling toolbar button.
   */
  renderMarkButton = (item: IMenuItem) => {
    const text = `${item.title}${item.type ? ` ${item.type}` : ''}`;
    return (
      <MenuItem
        key={text}
        text={text}
        icon={item.icon}
        onMouseDown={event => this.onClickMark(item, event)}
      />
    );
  };

  getMenuStyle = () => {
    if (this.menuRef === null) return {};
    return {
      opacity: 1,
      top: `calc(${this.state.position[1]}px)`,
      left: `calc(${this.state.position[0]}px - ${this.menuRef.offsetWidth /
        2}px)`,
    };
  };

  handleSearch = (event: KeyboardEvent) => {
    const { opacity } = this.getMenuStyle();
    if (opacity && this.state.items.length > 0) {
      event.preventDefault();
      event.stopPropagation();
      if (event.key === 'Escape') {
        // 有时候用户按 Esc 其实会希望关闭选单
        if (this.state.filter !== '') {
          // 如果有字在过滤器里，才会是指清空过滤器
          this.setState({ filter: '' });
        }
      } else if (event.key === 'Backspace' || event.key === 'Delete') {
        this.setState(({ filter }) => ({
          filter: filter.slice(0, Math.max(0, filter.length - 1)),
        }));
      } else if (/^[a-z0-9]$/.test(event.key)) {
        this.setState(({ filter }) => ({ filter: filter + event.key }));
      }
    }
  };

  render() {
    if (!this.props.open) return null;
    const { opacity, top, left } = this.getMenuStyle();
    const mountPoint = document.getElementById(this.props.mountPoint);
    if (mountPoint && this.state.items.length > 0) {
      const itemsToDisplay =
        this.state.filter.length > 0
          ? search(this.state.filter, this.state.items, {
              keySelector: (item: IMenuItem) => item.type,
            })
          : this.state.items;
      return ReactDOM.createPortal(
        <MenuContainer
          data-usage="hover-menu"
          opacity={opacity}
          top={top}
          left={left}
          ref={elem => {
            this.menuRef = elem;
          }}
        >
          <Menu>{itemsToDisplay.map(this.renderMarkButton)}</Menu>
          {this.state.filter}
        </MenuContainer>,
        mountPoint,
      );
    }
    return null;
  }
}
