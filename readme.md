## Cellular Automata

Creating a cellular automata with a couple lines of descriptive language and watch how it evolves:

It now supports hot loading, CONTINUE and STEP each loads the new paradigm from a pause.

e.g.

```
{
    "InitialCondition": "1 0.2",
    "0": [
        "CountAdjacent eq 1 3 1"
    ],
    "1": [
        "CountAdjacent lt 1 2 0",
        "CountAdjacent gt 1 3 0"
    ]
}
```

^^ This correspond to conway's game of life.

```
{
  "0": [
    "SpontaneousChange 1 0.02",
    "CountAdjacentChance gt 1 0 1 0.1"
  ],
  "1": [
    "SpontaneousChange 2 0.002",
    "CountAdjacent gt 2 0 2"
  ],
  "2": [
    "SpontaneousChange 0 1"
  ],
  "colorMap": {
    "0": "black",
    "1": "green",
    "2": "red"
  },
  "timeStep": 100
}
```

This correspond to a forest fire (more complex);

More examples: https://github.com/Aperocky/cellular-automata/tree/main/sample

### Functions
---

```
CountAdjacent [comparison-operator] [target] [threshold] [destination]
CountDirectlyAdjacent [comparison-operator] [target] [threshold] [destination]
```

This compares the total adjacent blocks that are `target` with `threshold` to determine if it will changes to `destination`. Adjacent goes to 8 neighboring cells, DirectlyAdjacent only goes to 4.

```
CountAdjacentChance [comparison-operator] [target] [threshold] [destination] [chance]
CountDirectlyAdjacentChance [comparison-operator] [target] [threshold] [destination] [chance]
```

This compares the total adjacent blocks that are `target` with `threshold` to determine if it will changes to `destination`, however, it only does so on `chance`.

```
SpontaneousChange [destination] [chance]
```

This will change into `destination` on `chance`.

```
ChangeByBlockAge [comparison-operator] [threshold] [destination] [chance]
```

This will change the block by comparing the age of the block (when it remains the same) against the `threshold`, and if satisfy the comparison, will change into `destination` on `chance`.

### InitialCondition
---

There are a few initial condition available:

When there are no initialCondition in the map, the map is initiated as all 0s.

```
"initialCondition": "[INITIAL_CONDITION]"
```

When `INITIAL_CONDITION` is in the format of:

```
"1 0.2": all blocks in the map will have 1 with a possibility of 20%

"CentralDot 1": A single 1 in the center.

"CentralSquare 1": A square of 1 (2x2) in the center, this is also perfectly in the middle of the whole map (100x100)

"cornerDot 1": A dot of 1 in the top left corner
```

### Anatomy of the json file
---

```
{
    "InitialCondition": "1 0.2",
```

Currently I only support 1 kind of initial value that are not zero, the first one being target.

```
    "0": [
        "CountAdjacent eq 1 3 1"
    ],
    "1": [
        "CountAdjacent lt 1 2 0",
        "CountAdjacent gt 1 3 0"
    ]
```

list of function associated with the current values in the locations, these 3 means:

* If this square is 0, Count All Adjacent 1s, if it equals 3, make the value 1.
* If this square is 1, Count All Adjacent 1s, if it is less than 2, make the value 0.
* If this square is 1, Count All Adjacent 1s, if it is greater than 3, make the value 0.

```
    "colorMap": {
        "0": "black",
        "1": "red"
    },
    "timestep": 100,
}
```

There is a default color map, you can make your own too. However, custom colormap need to cover all cases.

timestep are measured in milliseconds.

