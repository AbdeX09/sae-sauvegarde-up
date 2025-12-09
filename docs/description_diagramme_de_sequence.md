# Description du diagramme de séquence – ShieldBackup

Le diagramme de séquence représente le déroulement du scénario principal de ShieldBackup : l’exécution d’une sauvegarde demandée par l’administrateur. Il montre l’ordre chronologique des échanges entre les différents éléments du système.

## Participants du scénario
- **Administrateur** : déclenche la sauvegarde depuis l’interface.
- **Interface Web (IHM)** : transmet la demande au serveur de sauvegarde.
- **Serveur de sauvegarde** : coordonne toutes les opérations.
- **Serveur distant** : réalise les actions techniques (arrêt des services, création de l’archive, envoi).

##  Déroulement du scénario
1. L’administrateur demande une sauvegarde depuis l’interface.  
2. L’interface transmet cette demande au serveur de sauvegarde.  
3. Le serveur de sauvegarde ouvre une connexion SSH vers le serveur distant.  
4. Le serveur distant arrête les services nécessaires puis crée une archive des répertoires à sauvegarder.  
5. L’archive est envoyée au serveur de sauvegarde, qui la stocke et met à jour l’historique.  
6. Le serveur de sauvegarde renvoie le résultat (succès ou échec) à l’interface.  
7. L’interface affiche le résultat final à l’administrateur.

##  Objectif du diagramme
Ce diagramme permet de visualiser clairement le fonctionnement interne du système lors d’une sauvegarde.  
Il sert de base à la conception technique et confirme le scénario principal défini dans l’Inception du projet.

