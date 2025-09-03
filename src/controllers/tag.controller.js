import prisma from "../utils/prisma.js";


export async function gettags(req, res){
  const tags = await prisma.tag.findMany({});
  res.json(tags);
}


export async function createTag(req, res) {
  const { name } = req.body;
  const tag = await prisma.tag.create({ data: { name } });
  res.status(201).json(tag);
}
export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const tag = await prisma.tag.update({
      where: { id },
      data: { name }
    });

    res.json({ message: "Tag actualizada", tag });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.tag.delete({ where: { id } });

    res.json({ message: "Tag eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
