import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class App {
    public static void main(String[] args) throws Exception {
        System.out.println("Inout data");
        Scanner scanner = new Scanner(System.in);
        int sum = 0;
        String[][] groupedDigits = new String[][]{
            {"one", "two", "six"},
            {"four", "five", "nine"},
            {"three", "seven", "eight"}
        };
        
        Map<String, Integer> digitMap = new HashMap<>();
        addDigits(digitMap);

        while (true) {
            String line = scanner.nextLine();
            if (line.equals("exit")) break;

            int left = 0, right = line.length()-1;
            String digitToAdd1 = "", digitToAdd2 = "";
            while (true) {
                if (Character.isDigit(line.charAt(left))) {
                    digitToAdd1 = "" + line.charAt(left);
                    break;
                }
                if (left > 1) {
                    String cur = line.substring(left-2, left+1);
                    if (Arrays.asList(groupedDigits[0]).contains(cur)) {
                        digitToAdd1 = "" + digitMap.get(cur);
                        break;
                    }
                }
                if (left > 2) {
                    String cur = line.substring(left-3, left+1);
                    if (Arrays.asList(groupedDigits[1]).contains(cur)) {
                        digitToAdd1 = "" + digitMap.get(cur);
                        break;
                    }
                }
                if (left > 3) {
                    String cur = line.substring(left-4, left+1);
                    if (Arrays.asList(groupedDigits[2]).contains(cur)) {
                        digitToAdd1 = "" + digitMap.get(cur);
                        break;
                    }
                }

                left++;
            }
            
            while (true) {
                if (Character.isDigit(line.charAt(right))) {
                    digitToAdd2 = "" + line.charAt(right);
                    break;
                }
                if (line.length() - right > 2) {
                    String cur = line.substring(right, right+3);
                    if (Arrays.asList(groupedDigits[0]).contains(cur)) {
                        digitToAdd2 = "" + digitMap.get(cur);
                        break;
                    }
                }
                if (line.length() - right > 3) {
                    String cur = line.substring(right, right+4);
                    if (Arrays.asList(groupedDigits[1]).contains(cur)) {
                        digitToAdd2 = "" + digitMap.get(cur);
                        break;
                    }
                }
                if (line.length() - right > 4) {
                    String cur = line.substring(right, right+5);
                    if (Arrays.asList(groupedDigits[2]).contains(cur)) {
                        digitToAdd2 = "" + digitMap.get(cur);
                        break;
                    }
                }

                right--;
            }
            int x = Integer.parseInt(digitToAdd1 + "" + digitToAdd2);
            System.out.println(x);
            sum += x;
        }

        scanner.close();
        System.out.println(sum);
    }

    private static void addDigits(Map<String, Integer> digitMap) {
        digitMap.put("one", 1);
        digitMap.put("two", 2);
        digitMap.put("three", 3);
        digitMap.put("four", 4);
        digitMap.put("five", 5);
        digitMap.put("six", 6);
        digitMap.put("seven", 7);
        digitMap.put("eight", 8);
        digitMap.put("nine", 9);
    }
}
