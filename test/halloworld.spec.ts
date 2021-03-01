import { isAllowed } from "../src/index";
import { BarSchema, CarSchema, PersonSchema } from "./schemas";

// bogus test
describe("Bars", () => {
  it("Should pass this", () => {
    const target = {
      name: "Jimmys drinks",
      address: "Somewhere over the rainbow",
      drinks: {
        beer: ["Straffe Hendrik", "Rochefort", "St Bernard"],
      },
    };
    expect(isAllowed({ target, schema: BarSchema })).toBeTruthy();
  });
  it("Should not pass this", () => {
    const target = {
      name: "Sjonnies",
      address: "Centrum 001",
      drinks: [
        // < No object
        "Heineken",
      ],
    };
    expect(() => {
      isAllowed({ target, schema: BarSchema });
    }).toThrowError();
  });
});

describe("Cars", () => {
  it("Should pass this", () => {
    const target = {
      brand: "Mazda",
      type: "MX5 NB 1.8",
      milage: 199999.99,
      extras: ["2001 Special Edition"],
    };
    expect(isAllowed({ target, schema: CarSchema })).toBeTruthy();
  });
  it("Should not pass this", () => {
    const target = {
      brand: "BMW",
      type: "335",
      milage: "100000", // < No number
      extras: ["LCI", "KW Coilovers"],
    };
    expect(() => {
      isAllowed({ target, schema: CarSchema });
    }).toThrowError();
  });
});

describe("People", () => {
  it("Should pass this", () => {
    const target = {
      name: "James",
      age: 25,
      siblings: ["Johnnathan"],
      metaData: {},
      active: true,
    };

    expect(isAllowed({ target, schema: PersonSchema })).toBeTruthy();
  });
  it("Should not pass this", () => {
    const target = {
      name: "James",
      age: 25,
      active: true,
    };
    expect(() => {
      isAllowed({ target, schema: PersonSchema });
    }).toThrowError();
  });
});
