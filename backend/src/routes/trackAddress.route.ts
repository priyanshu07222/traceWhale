import { Router } from "express";
import trackAddress, { getTrackingAddress } from "../controller/trackAddress.controller";

const router = Router()

router.route('/trackAddress').post(trackAddress)
router.route('/trackAddress').get(getTrackingAddress)

export default router;