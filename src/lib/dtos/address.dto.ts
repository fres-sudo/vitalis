import { z } from "zod";

export const countryDto = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: "name-required",
    })
    .min(3)
    .max(100),
  shortName: z.string().min(1).max(5).optional(),
});

export const cityDto = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: "name-required",
    })
    .min(3)
    .max(255),
  shortName: z
    .string({
      required_error: "short.name required",
    })
    .min(2)
    .max(2),
  country: countryDto,
});

export const addressDto = z.object({
  id: z.string(),
  street: z
    .string({
      required_error: "street-required",
    })
    .min(3)
    .max(255),
  houseNumber: z.number().max(500).optional(),
  zip: z
    .number({
      required_error: "zip-requred",
    })
    .min(5)
    .max(5),
  city: cityDto,
});
