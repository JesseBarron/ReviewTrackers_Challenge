import React, { useState } from 'react';
import { Typography, Modal, Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { AppState } from '../main';

const ModalContainer = styled.div`
  width: 500px;
  position: absolute;
  background: white;
  border-radius: 8px;
  margin-bottom: 27%;
  padding: 22px;
`;


export default ({ review, response, label = 'Respond' }) => {
  const [ formState, setState ] = useState({
    showModal: false,
    responseText: response || '',
  });

  const toggleModal = () => setState(Object.assign({}, formState, { showModal: !formState.showModal }));
  const updateResponseText = e => setState(Object.assign({}, formState, {responseText: e.target.value}))

  return (
    <AppState.Consumer>
      {
        ({state, saveResponse}) => {
          
          const submitReview = () =>{
            saveResponse(formState.responseText, review);
            toggleModal();
          }

          return (
            <>
            <Button variant="contained"  color="primary" style={{margin: '15%'}} onClick={toggleModal}> { label } </Button >
            <Modal onBackdropClick={toggleModal} open={formState.showModal} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <ModalContainer>
                <Typography>Write a Response</Typography>
                <hr></hr>

                  <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
                    <TextField multiline label="Response" value={formState.responseText} onChange={updateResponseText} rows={3} rowsMax={3} style={{ width: '80%' }}/>
                  </div>
                  <div style={{ float: 'right' }}>
                    <Button variant="contained" style={{ margin: '2px' }} onClick={toggleModal}>Cancel</Button>
                    {
                      formState.responseText.length > 0 
                        ? <Button variant="contained" color="primary" onClick={submitReview} style={{ margin: '2px' }}>Submit</Button>
                        : <Button variant="contained" disabled >Submit</Button>
                    }
                  </div>
              </ModalContainer>
            </Modal>
            </>
          );
        }
      }
    </AppState.Consumer>
  ); 
}