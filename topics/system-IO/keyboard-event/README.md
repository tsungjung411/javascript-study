# KeyboardEvent 在不同設備下所產生的 key / code 值
- 右三欄為 舊設備(Android 6.0.0 / Chrome 44.0.2403.133) 的結果
- 剩餘欄為 新設備(Windows10 / Chrome 85.0.4183.83 (正式版本) (64 位元)) 的結果

## 控制鍵
| code         |   key   | keyCode | which | shiftKey | ctrlKey | altKey | metaKey | keyIdentifier | code      | key       |
|--------------|:-------:|---------|-------|----------|---------|--------|---------|---------------|-----------|-----------|
| ShiftLeft    |  Shift  | 16      | 16    | T        |         |        |         | U+00A0        | undefined | undefined |
| ShiftRight   |  Shift  | 16      | 16    | T        |         |        |         | U+00A1        | undefined | undefined |
| ControlLeft  | Control | 17      | 17    |          | T       |        |         | U+00A2        | undefined | undefined |
| ControlRight | Control | 17      | 17    |          | T       |        |         | U+00A3        | undefined | undefined |
| AltLeft      |   Alt   | 18      | 18    |          |         | T      |         | U+00A4        | undefined | undefined |
| AltRight     |   Alt   | 18      | 18    |          |         | T      |         | U+00A5        | undefined | undefined |
| MetaLeft     |   Meta  | 91      | 91    |          |         |        | T       | -             | undefined | undefined |
| MetaRight    |   Meta  | 92      | 92    |          |         |        | T       | -             | undefined | undefined |

## 數字鍵(NumLock=OFF)
| code           |   key   | keyCode | which | shiftKey | ctrlKey | altKey | metaKey | keyIdentifier | code | key |
|----------------|:-------:|---------|-------|----------|---------|--------|---------|---------------|------|-----|
| NumpadEnter    |  Enter  | 13      | 13    |          |         |        |         |               |      |     |
| Numpad0        |    0    | 96      | 96    |          |         |        |         |               |      |     |
| Numpad1        |    1    | 97      | 97    |          |         |        |         |               |      |     |
| Numpad2        |    2    | 98      | 98    |          |         |        |         |               |      |     |
| Numpad3        |    3    | 99      | 99    |          |         |        |         |               |      |     |
| Numpad4        |    4    | 100     | 100   |          |         |        |         |               |      |     |
| Numpad5        |    5    | 101     | 101   |          |         |        |         |               |      |     |
| Numpad6        |    6    | 102     | 102   |          |         |        |         |               |      |     |
| Numpad7        |    7    | 103     | 103   |          |         |        |         |               |      |     |
| Numpad8        |    8    | 104     | 104   |          |         |        |         |               |      |     |
| Numpad9        |    9    | 105     | 105   |          |         |        |         |               |      |     |
| NumpadMultiply |    *    | 106     | 106   |          |         |        |         |               |      |     |
| NumpadAdd      |    +    | 107     | 107   |          |         |        |         |               |      |     |
| NumpadSubtract |    -    | 109     | 109   |          |         |        |         |               |      |     |
| NumpadDecimal  |    .    | 110     | 110   |          |         |        |         |               |      |     |
| NumpadDivide   |    /    | 111     | 111   |          |         |        |         |               |      |     |
| NumLock        | NumLock | 144     | 144   |          |         |        |         |               |      |     |


## 數字鍵(NumLock=ON)
| code                 |     key    | keyCode | which | shiftKey | ctrlKey | altKey | metaKey | keyIdentifier | code | key |
|----------------------|:----------:|---------|-------|----------|---------|--------|---------|---------------|------|-----|
| Numpad1 (NumLock=ON) |     End    | 35      | 35    |          |         |        |         | End           |      |     |
| Numpad2 (NumLock=ON) |  ArrowDown | 40      | 40    |          |         |        |         | Down          |      |     |
| Numpad3 (NumLock=ON) |  PageDown  | 34      | 34    |          |         |        |         | PageDown      |      |     |
| Numpad4 (NumLock=ON) |  ArrowLeft | 37      | 37    |          |         |        |         | Left          |      |     |
| Numpad5 (NumLock=ON) |    Clear   | 12      | 12    |          |         |        |         |               |      |     |
| Numpad6 (NumLock=ON) | ArrowRight | 39      | 39    |          |         |        |         | Right         |      |     |
| Numpad7 (NumLock=ON) |    Home    | 36      | 36    |          |         |        |         | Home          |      |     |
| Numpad8 (NumLock=ON) |   ArrowUp  | 38      | 38    |          |         |        |         | Up            |      |     |
| Numpad9 (NumLock=ON) |   PageUp   | 33      | 33    |          |         |        |         | PageUp        |      |     |
| Numpad0 (NumLock=ON) |   Insert   | 45      | 45    |          |         |        |         |               |      |     |
| NumpadDecimal        |   Delete   | 46      | 46    |          |         |        |         | U+007F        |      |     |

