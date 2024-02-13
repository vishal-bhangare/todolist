import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    status: { type: Number },
  },
  { collection: "todos" }
);
export default mongoose.model("Todo", TodoSchema);
