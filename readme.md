## Cellular Automata

----

Creating a cellular automata with a couple lines of descriptive language and watch how it evolves:

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
  }
}
```

This correspond to a forest fire (more complex);

### Anatomy of the json file

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
    }
}
```

There is a default color map, you can make your own too. However, if you don't cover all possibilities the ones not covered will show up as turd color.
