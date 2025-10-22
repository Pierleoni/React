# Archittettura Multilivello 

1) Data Layer (alcuni DB che possiamo utilizzare sono:
    PostgreSQL, MySQL, MariaDB, Mongo DB, SQL SErver, Oracle). 
     ↓
2) Logic Layer (legge e aggorina i dati del database. 
    Python, Java, PHP, Pearl, Ruby, PEDL, C##, C++) 

3) Presentation/Client Layer (Interfaccia UI) Ha lo scopo di prendere le interazioni con l'utente

Tpicamente per il client si utlizza HTML,CSS e JS,
Mentre per il logic abbiamo più scelta. 
Nella parte Client JS possiamo declinarlo in ANgular, React , ecc. 
API si trovano nel livello Logic perchè si espongono negli endpoint che una volta messa una richiesta da parte dell'utente si trova un endpoint post che manda una richiesta al livello logico che a sua volta comunica con la parte server e quando il server eroga il servizio lo rimanda al client con un altro endpoint get se viene implementato nella parte client senno muore dopo aver mandato l'endpoint post.
QUindi in sostanza i 5 endpoint si devono implementare non succede nulla in automatico.




Non funziona cosi solo per la parte web ma anche per gli standalone (Whatsapp, Discord, ecc.).

