# Mathematics

>

## Zawartość:

- [Algebra](#algebra)
- [Vector](#vector)
- [Matrix](#matrix)

## Algebra

| Funkcja                        |                                 Opis                                 |
| ------------------------------ | :------------------------------------------------------------------: |
| **Algebra.factorial(n)**       |                 oblicza silnie liczby naturalnej _n_                 |
| **Algebra.symbolNewton(n,k)**  | oblicza symbol Newtona dla liczb naturalnych _n_ i _k_ (_n_ nad _k_) |
| **Algebra.binomialTheorem(n)** |             zwraca rozwinięcie (a+b)^n dwumianu Newtona              |

> Przykład użycia

```javascript
const factorial = Algebra.factorial(6); //720
const bt = Algebra.binomialTheorem(4); //"(a+b)^4 = (a^4) + 4*(a^3)*b + 6*(a^2)*(b^2) + 4*a*(b^3) + (b^4)"
```

## Vector

| Funkcja                              |                             Opis                             |
| ------------------------------------ | :----------------------------------------------------------: |
| **Vector.create(a, b)**              | zwraca wektor o początku w punkcie _a_ i końcu w punkcie _b_ |
| **Vector.getNorm(v)**                |                oblicza normę dla wektora _v_                 |
| **Vector.getLength(v)**              |                 oblicza długość wektora _v_                  |
| **Vector.getOpposite(v)**            |            zwraca wektor przeciwny do wektora _v_            |
| **Vector.multiply(v, x)**            |         zwraca wektor _v_ pomnożony przez liczbę _x_         |
| **Vector.add(v1, v2)**               |            zwraca sumę dwóch wektorów _v1_ i _v2_            |
| **Vector.subtract(v1, v2)**          |          zwraca różnicę dwóch wektorów _v1_ i _v2_           |
| **Vector.scalarProduct(v1, v2)**     |      oblicza iloczyn skalarny dla wektorów _v1_ i _v2_       |
| **Vector.isOrthogonal(v1, v2)**      |  sprawdza czy wektor _v1_ jest prostopadły do wektora _v2_   |
| **Vector.areOrthogonal(...vectors)** |         sprawdza czy układ wektorów jest ortogonalny         |
| **Vector.getAngle(v1, v2)**          |          oblicza kąt pomiędzy wektorami _v1_ i _v2_          |

> Przykład użycia

```javascript
const v1 = [1, 0, 0],
  v2 = [2, 0, 3];

//norma wektora v1
const norm = Vector.getNorm(v1); // 1

//iloczyn skalarny wektorów v1 i v2
const scalar = Vector.scalarProduct(v1, v2); // 2
```

## Matrix

| Funkcja                                       |                                             Opis                                              |
| --------------------------------------------- | :-------------------------------------------------------------------------------------------: |
| **Matrix.add(m1, m2)**                        |                               zwraca sumę macierzy _m1_ i _m2_                                |
| **Matrix.subtract(m1, m2)**                   |                              zwraca różnicę macierzy _m1_ i _m2_                              |
| **Matrix.multiplyByNumber(m, x)**             |                         zwraca macierz _m_ pomnożoną przez liczbę _x_                         |
| **Matrix.multiply(m1, m2)**                   |                              zwraca iloczyn macierzy _m1_ i _m2_                              |
| **Matrix.switchColumns(m, i, j)**             |                    zamienia miejscami kolumny (_i_ <=> _j_) w macierzy _m_                    |
| **Matrix.switchRows(m, i, j)**                |                    zamienia miejscami wiersze (_i_ <=> _j_) w macierzy _m_                    |
| **Matrix.multiplyColumn(m, i, x)**            |                     kolumnę o danym indeksie (_i_) mnoży przez liczbę _x_                     |
| **Matrix.multiplyRow(m, i, x)**               |                     wiersz o danym indeksie (_i_) mnoży przez liczbę _x_                      |
| **Matrix.addColToCol(m, i, j, x = 1)**        | do kolumnu o indeksie _i_ dodaję wartości z kolumny o indeksie _j_ pomnożone przez liczbę _x_ |
| **Matrix.addRowToRow(m, i, j, x = 1)**        | do wiersza o indeksie _i_ dodaję wartości z wiersza o indeksie _j_ pomnożone przez liczbę _x_ |
| **Matrix.isEqual(m1, m2)**                    |                        sprawdza czy macierze _m1_ i _m2_ są identyczne                        |
| **Matrix.isSquare(m)**                        |                           sprawdza czy macierz _m_ jest kwadratowa                            |
| **Matrix.isZero(m)**                          |                         sprawdza czy macierz _m_ jest macierzą zerową                         |
| **Matrix.isLowerTriangular(m)**               |                    sprawdza czy macierz _m_ jest macierzą trójkątną dolną                     |
| **Matrix.isUpperTriangular(m)**               |                    sprawdza czy macierz _m_ jest macierzą trójkątną górną                     |
| **Matrix.isTriangular(m)**                    |                       sprawdza czy macierz _m_ jest macierzą trójkątną                        |
| **Matrix.isDiagonal(m)**                      |                       sprawdza czy macierz _m_ jest macierzą diagonalną                       |
| **Matrix.isInvertible(m)**                    |                       sprawdza czy macierz _m_ jest macierzą odwracalną                       |
| **Matrix.isSingular(m)**                      |                        sprawdza czy macierz _m_ jest macierzą osobliwą                        |
| **Matrix.isNonSingular(m)**                   |                      sprawdza czy macierz _m_ jest macierzą nieosobliwą                       |
| **Matrix.isSymmetric(m)**                     |                      sprawdza czy macierz _m_ jest macierzą symetryczną                       |
| **Matrix.isAntisymmetric(m)**                 |                    sprawdza czy macierz _m_ jest macierzą antysymetryczną                     |
| **Matrix.isIdentity(m)**                      |                      sprawdza czy macierz _m_ jest macierzą jednostkową                       |
| **Matrix.isOpposite(m1, m2)**                 |              sprawdza czy macierz _m1_ jest macierzą przeciwną do macierzy _m2_               |
| **Matrix.getDeterminant(m)**                  |                                zwraca wyznacznik macierzy _m_                                 |
| **Matrix.getIdentity(dim)**                   |                          zwraca macierz jednostkową o wymiarze _dim_                          |
| **Matrix.getOpposite(m)**                     |                           zwraca macierz przeciwną do macierzy _m_                            |
| **Matrix.getTranspose(m)**                    |                         zwraca macierz transponowaną do macierzy _m_                          |
| **Matrix.getAlgebraicComplement(m, i, j)**    |                       zwraca dopełnienie algebraiczne elementu _m(ij)_                        |
| **Matrix.getMatrixOfAlgebraicComplements(m)** |                            zwraca macierz dopełnień algebraicznych                            |
| **Matrix.getInvertibleMatrix(m)**             |                            zwraca macierz odwrotną do macierzy _m_                            |

> Przykład użycia

```javascript
const m1 = [
  [1, -2, 3],
  [0, 4, -0.6],
];

const m2 = [[1], [3]];

const m3 = [
  [1, 0],
  [0, 4],
];

//macierz przeciwna do m2
const opposite = Matrix.getOpposite(m2); // [[-1], [-3]]

//do kolumny pierwszej dodano kolumnę drugą pomnożoną przez (-1)
const changedMatrix = Matrix.addColToCol(m1, 1, 2, -1); //[ [ 3, -2, 3 ], [ -4, 4, -0.6 ] ]

//sprawdza czy macierz m3 jest macierzą diagonalną
const isDiagonal = Matrix.isDiagonal(m3); // true
```

## Contact

Created by [Marta Zaorska](https://martazaorska.github.io/portfolio/).
