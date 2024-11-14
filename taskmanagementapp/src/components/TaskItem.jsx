import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const priorityColors = {
  High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  Medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  Low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
};

export default function TaskItem({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  onPriorityChange,
}) {
  const getDueDateColor = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "text-red-600 dark:text-red-400";
    if (diffDays <= 3) return "text-yellow-600 dark:text-yellow-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <Card className="mb-4 transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              className="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
            />
            <span
              className={`font-semibold ${
                task.completed
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : "dark:text-gray-100"
              }`}
            >
              {task.title}
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`text-sm ${priorityColors[task.priority]}`}
              >
                {task.priority}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>Set Priority</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={task.priority}
                onValueChange={(newPriority) =>
                  onPriorityChange(task.id, newPriority)
                }
              >
                <DropdownMenuRadioItem value="High">High</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Medium">
                  Medium
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Low">Low</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
          {task.description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <p className={`text-sm ${getDueDateColor(task.dueDate)}`}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
          {task.tags && task.tags.length > 0 && (
            <div className="flex space-x-1">
              {task.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="dark:bg-gray-700 dark:text-gray-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(task)}
            className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(task.id)}
            className="dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}