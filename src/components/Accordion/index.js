import React, { Component } from 'react';
import AccordionSection from './AccordionSection';
import { findDOMNode } from 'react-dom';

class Accordion extends Component {
  state = {
    openSections: [],
  }

  componentWillMount() {

  }

  openSection = (section, open = true) => {
    let openSections = [].concat(...this.state.openSections);

    if (open) {
      if (openSections.indexOf(section) === -1) {
        if (this.props.allowMultiOpen) {
          openSections.push(section)
        } else {
          openSections = [section];
        }
      }
    } else {
      const index = openSections.indexOf(section);
      if (index > -1) {
        openSections.splice(index, 1);
      }
    }
    this.setState({ openSections });
    this.scrollToTop();
  }

  openNextSection = () => {
    if (!this.props.allowMultiOpen) {
      const currentSection = this.state.openSections.length > 0 ? this.state.openSections[0] : -1;
      this.openSection(currentSection + 1);
      this.scrollToTop();
    }
  }

  closeAll = () => {
    this.setState({ openSections: [] });
    this.scrollToTop();
  }

  setRef = (wrapperId) => {
    if (wrapperId) {
      const els = document.getElementsByClassName(wrapperId);
      if (els.length > 0) {
        this.wrapper = els[0];
      }
    }

    return (el) => {
      this.accordion = el;
    }
  }

  scrollToTop = (top = 0) => {
    if (this.wrapper && this.wrapper.scrollTop !== 0) {
      this.wrapper.scrollTop = 0;
    }
  }

  render() {
    const { sections, wrapperId } = this.props;
    return (
      <div className="accordion_wrapper" ref={this.setRef(wrapperId)}>
        {sections.map((section, index) => (
          <AccordionSection
            key={index}
            index={index}
            openSection={this.openSection}
            isOpen={this.state.openSections.indexOf(index) > -1}
            {...section}
          />
        ))}
      </div>
    );

  }
}

Accordion.defaultProps = {
  allowMultiOpen: false,
  wrapperId: ''
}

export default Accordion;
