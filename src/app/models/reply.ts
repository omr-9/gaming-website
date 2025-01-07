import mongoose, { Schema } from "mongoose";

const reviewReplySchema = new Schema({
    reviewId: {type:Schema.Types.ObjectId, ref:'GameReview', required: true},
    userId:{type:Schema.Types.ObjectId, ref:'User', required: true},
    content:{type: String, required: true},
    createdAt: {type:Date, default:Date.now},
    likes:[{type:Schema.Types.ObjectId, ref:'User'}],
})
const ReviewReply = mongoose.models.ReviewReply || mongoose.model('ReviewReply', reviewReplySchema);
export default ReviewReply