public class App {
    public static void main(String[] args) throws Exception {
        long time = 54708275;
        long distance = 239114212951253L;
        long i = 1;
        while (i * (time-i) <= distance) {
            i++;
        }
        
        System.out.println(time + 1 - i*2);
    }
}
