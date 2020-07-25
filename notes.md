
TODO:
    (DONE) - Refactoring of the move functions (moveleft, moveright, ...) to one function
    (DONE) - maze with different height and width doesn't work (height = 10 width = 10 Works | height = 10 width = 11 Doesn't Work)
    (DONE) - reset maze:
        - clean maze walls
        - init data structures
        - init icon
            - init data structures~
            - set icon position to initial one

    - buttons for different actions (new functionalities)
        - new game
        - best scores
        - change icon
        - ...

    - refactoring
        - icon to be in maze
        (DOING)- maze.set put maze.set variable inside of kruskal algorithm method because thats the only place that maze.set is used

    - Do a "Start" and "Finish" where the Icon starts and finishes
        - improve the winning phase, like let the item on the winning case for 2 seconds and show a winner message for only 2 seconds and then reset, not instantly

    - Change Icon to be an image

    - create gitattributes

    (DONE)- draw maze step by step
        (DONE)- drawWall() => delWall()
        (DONE)- no generate(), em vez de fazer delWall(), tenho de guardar as coordenadas num vector
        (DONE)- utilizar um timer para ir buscar as coordenadas a um vetor e fazer delWall()

        (DONE) - if count > length da vec -> acabar
        (DONE) - esta a desenhar duas paredes no mesmo sitio, mesma coisa para apagar 
        (DONE) - KINDA OF BUG BUT NOT A BUG, if i finish the maze before it gets drawned, it still draws the last part and then starts drawing the real "next" maze

    - handle exceptions - maybe use frameworks for this because when i catch an error i could make an html page just to show the error, most of web frameworks deal with this

    - add more ways algorithms to generate a maze

    - (BUG) when clicking redraw and moving the icon, sometimes it draws 2 icons
        - probable solution, don't let redraw unless all is done (locks)
    


    Idea:
        - Put a small icon saying beta in the spots that aren't complete.



    Frontend:
        Known bugs:
            - When finished/Win, let icon move but not win again and again
            - When win, icon does not reaper at the beggining (only icon draw isn't, almost all the other logic is correct, need check)
            - Step-by-step and Redraw buttons aren't working in distributed game.


        (DONE) - What color I am
        - smaller icons to be able to have at least 4 icons in same place
        

    
    Backend:
        - Login and Sign In functionalities
    


    Money:
        - Add ads to the website