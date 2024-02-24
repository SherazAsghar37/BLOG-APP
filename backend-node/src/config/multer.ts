import multer from "multer";
import path from "path";
import { singleton } from "tsyringe";
@singleton()
export default class MulterConfig {
  public blogCoverMulterUpload = () => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../public/images/uploads/"));
      },
      filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    });
    return multer({ storage: storage });
  };
}
