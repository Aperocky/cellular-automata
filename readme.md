## Cellular Automata

----

Creating a cellular automata with a couple lines of descriptive language and watch how it evolves:

e.g.

```
{
    "InitialCondition": "1 0.2",
    "0": [
        "CountAdjacent eq 1 2 1",
        "CountAdjacent eq 1 3 1"
    ],
    "1": [
        "CountAdjacent lt 1 2 0",
        "CountAdjacent gt 1 3 0"
    ]
}
```

^^ This correspond to conway's game of life.
