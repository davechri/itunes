import React from "react";
import PropTypes from "prop-types";
import styled from "./styled-components/StyledComponent";
import {Modal} from 'carbon-components-react'

const ModalStyle = styled(Modal)`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  z-index: 100;  
  width: ${props => props.width};
  max-width: ${props => props.width};
  height: ${props => props.height};
`
export default class MessageModal extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    modalClosed: PropTypes.func.isRequired,
  }

  render() {   
    return (
      <ModalStyle className={'secondary-button-inactive'}
        //{...geometry}
        open={this.props.message.length > 0}
        modalHeading={'Something went wrong...'}
        primaryButtonText={'Go Back'}
        secondaryButtonText={ "Close" }
        onRequestSubmit={() => this.props.modalClosed()}
        onRequestClose={() => this.props.modalClosed()}
        >
          {this.props.message}
        </ModalStyle>
    );
  }
}