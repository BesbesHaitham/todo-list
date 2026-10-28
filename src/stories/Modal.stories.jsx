import { useState } from 'react';
import { fn } from 'storybook/test';
import Button from '../components/atoms/Button';
import Modal from '../components/molecules/Modal';
import TaskForm from '../components/molecules/TaskForm';

export default {
  title: 'Molecules/Modal',
  component: Modal,
  args: {
    title: 'A fresh start',
    description: 'Big ideas start with one small task.',
    onClose: fn(),
    children: 'Your dialog content goes here.',
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        {open && (
          <Modal
            {...args}
            onClose={() => {
              args.onClose();
              setOpen(false);
            }}
          />
        )}
      </>
    );
  },
};

export const Default = {};
export const WithTaskForm = { args: { children: <TaskForm onSubmit={fn()} onCancel={fn()} /> } };
