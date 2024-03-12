import { Router } from "express";
import createProperty from "../services/properties/createProperty.js";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight, amenities } = req.query;

    const properties = await getProperties({
      location,
      pricePerNight,
      amenities,
    });
    res.json(properties);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const newProperty = await createProperty(req.body);
    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);

    if (!property) {
      res.status(404).json({ message: `Property with id ${id} not found` });
    } else {
      res.status(200).json(property);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProperty = await updatePropertyById(id, req.body);

    if (updatedProperty) {
      res.status(200).send({
        message: `Property with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Property with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPropertyId = await deletePropertyById(id);

    if (deletedPropertyId) {
      res.status(200).send({
        message: `Property with id ${id} successfully deleted`,
      });
    } else {
      res.status(404).json({
        message: `Property with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
