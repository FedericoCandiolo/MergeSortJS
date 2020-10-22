# MergeSortJS
Animando el Algoritmo MergeSort en JavaScript.

Si utilizáramos un método básico para arregar el arreglo, como un BubbleSort, tendríamos una O(n^2).
Sin embargo, si separamos el arreglo en mitades, cada mitad tendría O((n/2)^2), que es lo mismo que O(n^2 / 4). Luego ordenar recorrer ambas mitades una vez tiene una O(n).

MergeSort plantea el dividir el arreglo la mayor cantidad de veces posible, para seguir disminuyendo la complejidad algorítmica. Un arreglo de tamaño n se puede dividir log2(n) veces. Por esto obtenemos un algoritmo con O(n log(n)).
