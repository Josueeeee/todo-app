import prisma from "../utils/prisma.js";

export async function getTodos(req, res) {
  const todos = await prisma.todo.findMany({
    where: { ownerId: req.userId },
    include: { subtasks: true, tags: { include: { tag: true } } },
  });
  res.json(todos);
}

export async function createTodo(req, res) {
  const { title, description, priority, dueDate } = req.body;
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      ownerId: req.userId,
    },
  });
  res.status(201).json(todo);
}

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, done, priority, dueDate } = req.body;

    const todo = await prisma.todo.update({
      where: { id },
      data: { title, description, done, priority, dueDate }
    });

    res.json({ message: "Todo actualizado", todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.todo.delete({ where: { id } });

    res.json({ message: "Todo eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const addTagToTodo = async (req, res) => {
  try {
    const { todoId, tagId } = req.body;

    if (!todoId || !tagId) {
      return res.status(400).json({ error: "Faltan todoId o tagId" });
    }

    // Validar que existan
    const [todo, tag] = await Promise.all([
      prisma.todo.findUnique({ where: { id: todoId } }),
      prisma.tag.findUnique({ where: { id: tagId } })
    ]);

    if (!todo) return res.status(404).json({ error: "Todo no encontrado" });
    if (!tag) return res.status(404).json({ error: "Tag no encontrado" });

    // Crear relación en la tabla intermedia
    const todoTag = await prisma.todoTag.create({
      data: { todoId, tagId }
    });

    res.json({ message: "Tag asignado al Todo", todoTag });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Este tag ya está asignado a este Todo" });
    }
    res.status(500).json({ error: error.message });
  }
};
