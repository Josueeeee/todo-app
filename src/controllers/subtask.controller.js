import prisma from "../utils/prisma.js";


export async function getSubtask(req, res) {
  const subtasks = await prisma.subtask.findMany({
 
  });
  res.json(subtasks);
}

export async function createSubtask(req, res) {
  const { title, todoId } = req.body;

  const subtask = await prisma.subtask.create({
    data: { title, todoId },
  });

  res.status(201).json(subtask);
}
export const updateSubtask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, done } = req.body;

    const subtask = await prisma.subtask.update({
      where: { id },
      data: { title, done }
    });

    res.json({ message: "Subtask actualizada", subtask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteSubtask = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.subtask.delete({ where: { id } });

    res.json({ message: "Subtask eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
