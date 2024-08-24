import { Router } from "express";
import trackAddress, { deleteAddress, getTrackingAddress, updateAddressAmount } from "../controller/trackAddress.controller";

const router = Router()

router.route('/trackAddress').post(trackAddress);
router.route('/trackAddress').get(getTrackingAddress);
router.route('/trackAddress').patch(updateAddressAmount);
router.route('/trackAddress').delete(deleteAddress);

export default router;