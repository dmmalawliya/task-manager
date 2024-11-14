"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Moon, PlusIcon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const priorityOrder = (priority) => {
  switch (priority) {
    case "High":
      return 1;
    case "Medium":
      return 2;
    case "Low":
      return 3;
    default:
      return 4;
  }
};

export default function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("darkMode", darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [tasks, darkMode]);

  const handlePriorityChange = (id, newPriority) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, priority: newPriority } : task
      )
    );
  };

  const handleSaveTask = (task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, task]);
    }
    setEditingTask(null);
    setIsTaskFormOpen(false);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority =
      filterPriority === "All" || task.priority === filterPriority;
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Completed" && task.completed) ||
      (filterStatus === "Incomplete" && !task.completed);
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const now = new Date();
  const upcomingTasks = filteredTasks
    .filter((task) => !task.completed && new Date(task.dueDate) > now)
    .sort((a, b) => priorityOrder(a.priority) - priorityOrder(b.priority));
  const overdueTasks = filteredTasks
    .filter((task) => !task.completed && new Date(task.dueDate) < now)
    .sort((a, b) => priorityOrder(a.priority) - priorityOrder(b.priority));
  const completedTasks = filteredTasks
    .filter((task) => task.completed)
    .sort((a, b) => priorityOrder(a.priority) - priorityOrder(b.priority));

  const completionPercentage =
    Math.round((completedTasks.length / tasks.length) * 100) || 0;

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`}
    >
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center">Task Manager</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {darkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem] text-white-500" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem] text-gray-700" />
            )}
          </Button>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow dark:bg-gray-800 dark:text-gray-100"
          />
          <Select
            value={filterPriority}
            onValueChange={(value) => setFilterPriority(value)}
          >
            <SelectTrigger className="w-full sm:w-[180px] dark:bg-gray-800 dark:text-gray-100">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Priorities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filterStatus}
            onValueChange={(value) => setFilterStatus(value)}
          >
            <SelectTrigger className="w-full sm:w-[180px] dark:bg-gray-800 dark:text-gray-100">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Incomplete">Incomplete</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => {
            setEditingTask(null);
            setIsTaskFormOpen(true);
          }}
          className="mb-6 w-full sm:w-auto dark:bg-slate-700 dark:text-white dark:hover:bg-slate-800"
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Add New Task
        </Button>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Overall Progress</h2>
          <Progress value={completionPercentage} className="w-full" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {completionPercentage}% of tasks completed
          </p>
        </div>

        {isTaskFormOpen && (
          <TaskForm
            task={editingTask}
            onSave={handleSaveTask}
            onCancel={() => {
              setIsTaskFormOpen(false);
              setEditingTask(null);
            }}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Upcoming Tasks</h2>
            <TaskList
              tasks={upcomingTasks}
              onEdit={(task) => {
                setEditingTask(task);
                setIsTaskFormOpen(true);
              }}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
              onPriorityChange={handlePriorityChange}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Overdue Tasks</h2>
            <TaskList
              tasks={overdueTasks}
              onEdit={(task) => {
                setEditingTask(task);
                setIsTaskFormOpen(true);
              }}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
              onPriorityChange={handlePriorityChange}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Completed Tasks</h2>
            <TaskList
              tasks={completedTasks}
              onEdit={(task) => {
                setEditingTask(task);
                setIsTaskFormOpen(true);
              }}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
              onPriorityChange={handlePriorityChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}