# Description du diagramme de cas d’usage – ShieldBackup

Le diagramme de cas d’usage présente les principales fonctionnalités offertes par le système ShieldBackup du point de vue de l’**Administrateur**, qui est l’unique acteur du système. Il sert à définir ce que le système doit permettre de faire avant la conception technique.

##  Acteur

- **Administrateur** :  
  Utilisateur technique du système. Il déclare les serveurs, configure les sauvegardes et supervise l’état général.

## Fonctionnalités représentées

Le diagramme regroupe notamment les cas d’usage suivants :

- **Déclarer un serveur** : enregistrer un nouveau serveur distant à sauvegarder.  
- **Configurer les répertoires** : choisir les dossiers/fichiers à inclure dans les sauvegardes.  
- **Configurer les services** : indiquer les services à arrêter/redémarrer pendant la sauvegarde.  
- **Définir la fréquence et l’échantillonnage** : paramétrer la planification et la politique de rétention des archives.  
- **Lancer une sauvegarde** : déclencher une sauvegarde ponctuelle ou utiliser celles planifiées.  
- **Superviser les sauvegardes** : consulter l’état, l’historique et l’espace disque sur le serveur de sauvegarde.

Certains cas d’usage de supervision (état, historique, espace disque) peuvent être reliés par des relations `<<include>>` au cas d’usage global *Superviser les sauvegardes*.

##  Rôle du diagramme

Ce diagramme définit le **périmètre fonctionnel** de ShieldBackup.  
Il sert de base à la suite du projet : scénario principal, diagramme de séquence, choix d’architecture et planification selon l’Unified Process.
