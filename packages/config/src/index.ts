import { warn } from "console";

class Rule {}
class Module {}

function indexPublicApi(): Rule {
  return {};
}
function restrictCrossImports(): Rule {
  return {};
}
function importsOrder(order: string[]): Rule {
  return {};
}

function module({}: {
  name: string;
  modules?: Record<string, Module>;
  rules?: Rule[];
}): Module {
  return {};
}

export function defineConfig(path: string, abstraction: Module) {}

const feature = module({
  name: "feature",
  modules: {
    "*": module({
      name: "other",
      modules: {},
    }),
    "./domain": module({
      name: "domain",
      modules: {},
    }),
    "./model": module({
      name: "model",
      modules: {},
    }),
    "./ui": module({
      name: "ui",
      modules: {},
    }),
    "./index.ts": module({
      name: "index",
    }),
  },
  rules: [
    importsOrder(["domain", "other", "model", "ui", "index"]),
    indexPublicApi(),
  ],
});

const entity = module({
  name: "entity",
  modules: {},
  rules: [],
});

const shared = module({
  name: "shared",
  modules: {},
  rules: [],
});

const fsdApp = module({
  name: "fsdApp",
  modules: {
    "./src/features": module({
      name: "features",
      modules: {
        "*": feature,
      },
    }),
    "./src/entities": module({
      name: "entities",
      modules: {
        "*": entity,
      },
    }),
    "./src/shared": shared,
  },
  rules: [importsOrder(["shared", "entities", "features"])],
});

const package = module({
  name: "package",
  modules: {},
  rules: [indexPublicApi()],
});

defineConfig(
  ".",
  module({
    name: "app",
    modules: {
      "./apps": module({
        name: "apps",
        modules: {
          "*": fsdApp,
        },
      }),
      "./packages": module({
        name: "packages",
        modules: {},
      }),
    },
    rules: [importsOrder(["apps", "packages"])],
  })
);

/*
 *
 *
 *
  {
  abstractions: [
    new Layer({
      name: "features",
      path: "./src/features",
      modules: [
        new Module({
          name: "feature",
          path: "*",
          abstractions: [],
        }),
      ],
    }),
    new Layer({
      name: "entities",
      path: "./src/entities",
      modules: [
        new Module({
          name: "entity",
          path: "*",
          abstractions: [],
        }),
      ],
      rules: [new RestrictCrossImports()],
    }),
    new Module({
      name: "shared",
      path: "./src/shared",
      abstractions: [
        new Module({
          path: "api",
          name: "api",
          abstractions: [],
        }),
      ],
    }),
  ],
  rules: [
    new ImportsOrder({
      order: ["shared", "entities", "features"],
    }),
  ],
}*/
