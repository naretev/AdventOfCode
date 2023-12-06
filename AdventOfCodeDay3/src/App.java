import java.util.ArrayList;
import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        ArrayList<String> data = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);

        while (true) {
            String line = scanner.nextLine();
            if (line.equals("exit")) break;
            data.add(line);
        }
        scanner.close();

        char[][] schematic = new char[data.size()][data.get(0).length()];

        for (int i = 0; i < schematic.length; i++) {
            schematic[i] = data.get(i).toCharArray();
        }

        int result = 0;
        for (int i = 0; i < schematic.length; i++) {
            for (int j = 0; j < schematic[0].length; j++) {
                if (schematic[i][j] == '*') {
                    result += calculateGearRatio(i, j, schematic);
                }
            }
        }

        System.out.println(result);
    }

    private static int calculateGearRatio(int row, int col, char[][] schematic) {
        int[] rowOffsets = {-1, -1, -1, 0, 1, 1, 1, 0};
        int[] colOffsets = {1, 0, -1, -1, -1, 0, 1, 1};

        int[] partNumbers = new int[2];
        int partIndex = 0;

        for (int i = 0; i < rowOffsets.length; i++) {
            int newRow = row + rowOffsets[i];
            int newCol = col + colOffsets[i];

            if (isValidPosition(schematic, newRow, newCol) && Character.isDigit(schematic[newRow][newCol])) {
                partNumbers[partIndex++] = getNumber(newRow, newCol, schematic);
            }
        }

        //if gear doesnt have 2 numbers, x * 0 is still 0
        return partNumbers[0] * partNumbers[1];
    }

    private static int getNumber(int i, int j, char[][] schematic) {
        int startingPoint = j;

        while (startingPoint > 0 && Character.isDigit(schematic[i][startingPoint - 1])) startingPoint--;

        StringBuilder result = new StringBuilder();

        while (startingPoint < schematic[0].length && Character.isDigit(schematic[i][startingPoint])) {
            result.append(schematic[i][startingPoint]);
            schematic[i][startingPoint] = '.';
            startingPoint++;
        }

        return Integer.parseInt(result.toString());
    }

    private static boolean isValidPosition(char[][] grid, int row, int col) {
        return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;
    }
}
