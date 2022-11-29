import java.util.Scanner;

public class App {
    public static void main(String[] args) throws Exception {

        Scanner userInput = new Scanner(System.in);
        
        System.out.print("Enter desired triangle height: ");       

        int triangleHeight = userInput.nextInt();

        drawTriange(triangleHeight);
    }

    // Function that prints a triangle with height based on user input
    // Input: integer
    public static void drawTriange(int tHeight) {
        for (int i = 1; i <= tHeight; i++) {
            for (int j = 1; j <= tHeight; j++) {
                if (j <= tHeight - i) {
                    System.out.print(" ");
                } 
                else {
                    System.out.print("* ");
                }
            }

            System.out.println();
        }
    }
}