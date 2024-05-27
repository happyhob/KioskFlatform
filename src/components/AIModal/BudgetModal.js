import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const BudgetModal = ({ open, onClose, onSubmit }) => {
  const [budget, setBudget] = useState('');

  const handleSubmit = () => {
    onSubmit(budget);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>예산 입력</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="budget"
          label="예산"
          type="number"
          fullWidth
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          취소
        </Button>
        <Button onClick={handleSubmit} color="primary">
          제출
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BudgetModal;
