import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TaskManager = () => {
  // State management
  const [tasks, setTasks] = useState([]);
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Task operations
  const handleAddTask = (newTask) => {
    const taskWithMeta = {
      ...newTask,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setTasks(prevTasks => [...prevTasks, taskWithMeta]);
    setIsAddingTask(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleToggleStatus = (taskId) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <Button
            onClick={() => setIsAddingTask(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New Task
          </Button>
        </div>

        {/* Add Task Dialog */}
        <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            {/* AddTaskForm will be rendered here */}
            <div className="text-center text-gray-500">
              AddTaskForm component will be integrated here
            </div>
          </DialogContent>
        </Dialog>

        {/* Dashboard */}
        <div className="text-center text-gray-500">
          Dashboard component will be integrated here
        </div>

        {/* Task Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm font-medium text-gray-500">Total Tasks</div>
            <div className="text-2xl font-bold">{tasks.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-medium text-gray-500">Completed</div>
            <div className="text-2xl font-bold">
              {tasks.filter(task => task.status === 'completed').length}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-medium text-gray-500">Pending</div>
            <div className="text-2xl font-bold">
              {tasks.filter(task => task.status === 'pending').length}
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default TaskManager;