let tagsModel = require("./tags");

const createTag = (tag) => tagsModel.create(tag);

const findTags = () => tagsModel.find();

const findTag = (name) => tagsModel.findOne({name: name})

const updateTag = (tid, tag) => tagsModel.updateOne({_id: tid}, { $set: tag});

const deleteTag = (tagId) => tagsModel.deleteOne({_id: tagId});

const findAllTags = async (req, res) => {
	const tags = await findTags();
	res.json(tags);
}

const findOneTag = async (req, res) => {
	const name = req.params.name;
	const tag = await findTag(name);
	res.json(tag);
}

const createNewTag = async (req, res) => {
	const newTag = await createTag(req.body);
	res.json(newTag);
}

const updateOneTag = async (req, res) => {
	const tid = req.params.tid;
	const tag = req.body;
	const updatedTag = await updateTag(tid, tag);
	res.json(updatedTag);
}

const removeTag = async (req, res) => {
	const tid = req.params.tid;
	const status = await deleteTag(tid);
	res.json(status);
}

const TagsController = (app) => {
	app.get("/api/tags", findAllTags);
	app.get("/api/tags/:name", findOneTag);
	app.post("/api/tags", createNewTag);
	app.put("/api/tags/:tid", updateOneTag);
	app.delete("/api/tags/:tid", removeTag);
}

module.exports = TagsController;