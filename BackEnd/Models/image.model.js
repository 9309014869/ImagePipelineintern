import mongoose,{Schema} from "mongoose";
const ImageUrlSchema = new Schema({
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    ImageUrl: {
      type: String,
      required: true
    },
  }, 
  {
    timestamps: true
  }
);

const ImageUrlStore= mongoose.model('ImageUrlStore', ImageUrlSchema);

export default ImageUrlStore;