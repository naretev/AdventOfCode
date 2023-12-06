import java.util.*;

public class App {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // int targetRed = 12;
        // int targetGreen = 13;
        // int targetBlue = 14;

        int sumOfPossibleGames = 0;

        while (true) {
            String line = scanner.nextLine();
            if (line.equals("exit")) break;
            String[] parts = line.split(";");

            //int gameId = Integer.parseInt(parts[0].split(" ")[1].replace(":", ""));

            parts[0] = parts[0].split(":")[1];

            int redCount = 0;
            int greenCount = 0;
            int blueCount = 0;

            for (int i = 0; i < parts.length; i++) {
                String[] subsetParts = parts[i].trim().split(", ");

                for (String subsetPart : subsetParts) {
                    int count = Integer.parseInt(subsetPart.split(" ")[0]);
                    String color = subsetPart.split(" ")[1];

                    if (color.equals("red")) {
                        redCount = Math.max(redCount, count);
                    } else if (color.equals("green")) {
                        greenCount = Math.max(greenCount, count);
                    } else if (color.equals("blue")) {
                        blueCount = Math.max(blueCount, count);
                    }
                }
            }

            sumOfPossibleGames += redCount * greenCount * blueCount;
        }
        scanner.close();

        System.out.println(sumOfPossibleGames);
    }
}
