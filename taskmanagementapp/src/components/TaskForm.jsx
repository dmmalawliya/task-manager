import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function TaskForm({ task, onSave, onCancel }) {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [priority, setPriority] = useState(task?.priority || "Medium");
  const [tags, setTags] = useState(task?.tags || []);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitle(task?.title || "");
      setDescription(task?.description || "");
      setDueDate(task?.dueDate || "");
      setPriority(task?.priority || "Medium");
      setTags(task?.tags || []);
    }
  }, [isOpen, task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: task?.id || Date.now().toString(),
      title,
      description,
      dueDate,
      priority,
      tags,
      completed: task?.completed || false,
    });
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onCancel) onCancel();
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) handleClose();
      }}
    >
      <DialogContent className="dark:bg-gray-800 dark:text-white">
        <DialogHeader>
          <DialogTitle className="dark:text-gray-100">
            {task ? "Edit Task" : "Add New Task"}
          </DialogTitle>
          <DialogDescription className="dark:text-gray-300">
            {task
              ? "Make changes to your task here. Click Update Task when you're done."
              : "Add a new task. Click Add Task when you're done."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            />
          </div>
          <div>
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            />
          </div>
          <div>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            />
          </div>
          <div>
            <Select
              value={priority}
              onValueChange={(value) => setPriority(value)}
            >
              <SelectTrigger className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="flex space-x-2 mb-2">
              <Input
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                className="dark:bg-slate-600 dark:text-white dark:hover:bg-slate-700"
              >
                Add Tag
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 dark:bg-gray-600 dark:text-gray-100"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-xs dark:text-gray-300 dark:hover:text-gray-100"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="dark:bg-slate-600 dark:text-white dark:hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="dark:bg-slate-600 dark:text-white dark:hover:bg-slate-700"
            >
              {task ? "Update" : "Add"} Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}