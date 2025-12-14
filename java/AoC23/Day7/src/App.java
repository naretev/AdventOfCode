import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        List<HandBidPair> handBidPairs = new ArrayList<>();

        // Read input until the end of the file
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.isEmpty()) {
                break;
            }

            String[] parts = line.split(" ");
            String hand = parts[0];
            int bid = Integer.parseInt(parts[1]);

            handBidPairs.add(new HandBidPair(hand, bid));
        }
        scanner.close();

        // Sort hands based on rank
        Collections.sort(handBidPairs, Comparator.comparingInt(App::getHandRank));

        // Calculate total winnings
        int totalWinnings = calculateTotalWinnings(handBidPairs);

        // Output the result
        System.out.println("The total winnings are: " + totalWinnings);
    }

    private static int calculateTotalWinnings(List<HandBidPair> handBidPairs) {
        int totalWinnings = 0;

        for (int i = 0; i < handBidPairs.size(); i++) {
            totalWinnings += handBidPairs.get(i).getBid() * (i + 1);
        }

        return totalWinnings;
    }

    private static int getHandRank(HandBidPair handBidPair) {
        String hand = handBidPair.getHand();

        if (isFiveOfAKind(hand)) {
            return 8;
        } else if (isFourOfAKind(hand)) {
            return 7;
        } else if (isFullHouse(hand)) {
            return 6;
        } else if (isThreeOfAKind(hand)) {
            return 5;
        } else if (isTwoPair(hand)) {
            return 4;
        } else if (isOnePair(hand)) {
            return 3;
        } else {
            return 2; // High card
        }
    }

    private static boolean isFiveOfAKind(String hand) {
        return hand.matches("(.)\\1{4}");
    }

    private static boolean isFourOfAKind(String hand) {
        return hand.matches("((.)\\2{3}(?:(?!\\2).)?)|((?:(.)\\3{3}.?)|(?.*?(.)\\5{3}))");
    }

    private static boolean isFullHouse(String hand) {
        return hand.matches("((.)\\2{2}(?:(?!\\2).)?)|((?:(.)\\3{2}.?)|(?.*?(.)\\5{2}))");
    }

    private static boolean isThreeOfAKind(String hand) {
        return hand.matches("((.)\\2{2}(?:(?!\\2).)?)|((?:(.)\\3{2}.?)|(?.*?(.)\\5{2}))");
    }

    private static boolean isTwoPair(String hand) {
        return hand.matches("((.)\\2(?:(?!\\2).)?(.)\\3)|((?:(.)\\4(?:(?!\\4).)?)(?:(.)\\5(?:(?!\\5).)?))");
    }

    private static boolean isOnePair(String hand) {
        return hand.matches("(.)\\1(?:(?!\\1).)?(.)(?:\\2(?:(?!\\2).)?)?");
    }
}

class HandBidPair {
    private final String hand;
    private final int bid;

    public HandBidPair(String hand, int bid) {
        this.hand = hand;
        this.bid = bid;
    }

    public String getHand() {
        return hand;
    }

    public int getBid() {
        return bid;
    }
}
