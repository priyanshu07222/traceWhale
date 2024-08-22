import { Router } from "express";
import trackAddress from "../controller/trackAddress.controller";

const router = Router()

router.route('/trackAddress').post(trackAddress)
router.route('/trackAddress').get()

export default router;