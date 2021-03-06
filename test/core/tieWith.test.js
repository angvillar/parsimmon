"use strict";

suite("parser.tieWith()", function() {
  test("handles empty args", function() {
    var parser = Parsimmon.of([]).tieWith("");
    var result = parser.tryParse("");
    assert.strictEqual(result, "");
  });

  test("concatenates all the results", function() {
    var parser = Parsimmon.seq(
      Parsimmon.string("<| "),
      Parsimmon.letter,
      Parsimmon.digit,
      Parsimmon.string(" |>")
    ).tieWith("+");
    var text = "<| o7 |>";
    var result = parser.tryParse(text);
    assert.strictEqual(result, "<| +o+7+ |>");
  });

  test("only accept array of string parsers", function() {
    assert.throws(function() {
      Parsimmon.of(1)
        .tieWith("")
        .tryParse("");
    });
    assert.throws(function() {
      Parsimmon.of([1])
        .tieWith("")
        .tryParse("");
    });
    assert.throws(function() {
      Parsimmon.of(["1", 2])
        .tieWith("")
        .tryParse("");
    });
    assert.doesNotThrow(function() {
      Parsimmon.of(["1"])
        .tieWith("")
        .tryParse("");
    });
  });
});
