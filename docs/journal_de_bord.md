# Journal de bord – Projet SAE ShieldBackup

Au cours de la semaine de travail, l’équipe a commencé par analyser le sujet ainsi que le document « UP – Initialisation ». Cette étape a permis de clarifier les objectifs du projet et de comprendre les attentes liées à la phase d’initialisation, notamment la mise en place d’un système de sauvegarde décentralisé reposant sur une communication SSH.

La répartition des rôles a été effectuée dès le début de la semaine. Timéo s’est chargé de la réalisation du diagramme de Gantt, qu’il a structuré en identifiant les tâches principales et en les organisant selon la méthodologie Unified Process. Ce travail a permis de définir un planning clair pour la suite du projet.

Abdennour a mis en place et organisé le dépôt GitHub. Il a assuré la rédaction de la documentation et réalisé les diagrammes UML attendus pour cette phase : le diagramme de cas d’usage et le diagramme de séquence. Ces diagrammes ont été ajustés après un retour du professeur afin de simplifier la modélisation, d’ajouter l’authentification et de respecter la structure recommandée.

Nicolas a conçu la maquette HTML de l’interface web. Cette maquette permet de visualiser l'organisation générale de l'application et reste cohérente avec les cas d’usage définis, conformément aux recommandations du professeur.

À la fin de la semaine, l’ensemble des livrables attendus pour la phase d’initialisation avait été produit : diagramme de cas d’usage, diagramme de séquence nominal, expression des besoins, maquette HTML, diagramme de Gantt et dépôt GitHub structuré.





RAPPORT TECHNIQUE DÉTAILLÉ
Projet SAE – Unified Process
Application : ShieldBackup
1. Contexte et objectif du projet
Le projet ShieldBackup consiste à développer une application web permettant à un administrateur système de gérer des serveurs et d’effectuer des sauvegardes de données via SSH et rsync.

L’objectif principal est :

de configurer des serveurs à sauvegarder,

de lancer des sauvegardes ponctuelles,

de consulter l’état et l’historique des sauvegardes.

Le projet est réalisé selon la méthode Unified Process (UP), imposant une approche itérative, incrémentale et orientée cas d’usage.

2. Méthodologie : Unified Process (UP)
Le Unified Process structure le projet en 4 phases :

Phase	Objectif
Inception	Comprendre le besoin et cadrer le projet
Élaboration	Définir l’architecture et prouver la faisabilité
Construction	Implémenter les fonctionnalités complètes
Transition	Tester, livrer et présenter
Chaque phase est découpée en cycles, chacun centré sur un ou plusieurs cas d’usage.

3. Phase d’Inception – Cadrage du projet
3.1 Objectifs
Identifier le besoin client

Définir les fonctionnalités principales

Organiser l’équipe et le planning

3.2 Travaux réalisés
Organisation de l’équipe

Expression des besoins fonctionnels

Identification de l’acteur Administrateur

Réalisation du diagramme de cas d’usage UML

Création d’une maquette HTML

Élaboration du diagramme de Gantt

Création du dépôt Git

Début et finalisation des diagrammes de séquence

3.3 Résultat
Un périmètre fonctionnel clairement défini et validé.

4. Phase d’Élaboration – Validation technique
Objectif global
Prouver que l’architecture fonctionne et que le système est techniquement réalisable.

4.1 Cycle 1 – Mise en place de l’architecture
Actions réalisées
Mise en place des machines virtuelles

Création de l’arborescence du projet

Choix de l’architecture MVC

Installation de Node.js et du framework web

Configuration SSH entre les serveurs

Installation et test de rsync

Application de test

Validation de l’environnement technique

Preuve
Connexion SSH fonctionnelle

Commandes rsync testées manuellement

4.2 Cycle 2 – Prototype fonctionnel
Actions réalisées
Validation finale des cas d’usage

Intégration de la maquette HTML dans le MVC

Création des premières classes applicatives

Interface de sauvegarde affichée

Définition des tests de recette (en amont)

4.3 Cycle 3 – Preuve fonctionnelle clé
Cas d’usage validé
Lancer une sauvegarde ponctuelle

Implémentation
Bouton « Lancer sauvegarde » dans l’interface

Appel HTTP vers le serveur applicatif

Déclenchement d’une action côté serveur

Retour d’un message succès / erreur

Preuve attendue (atteinte)
Clic sur le bouton → action serveur → réponse visible à l’écran

➡️ La phase Élaboration est validée.

5. Phase de Construction – Implémentation complète
La phase de construction est organisée en cycles itératifs.
⚠️ Les tests sont définis AVANT l’implémentation, conformément à UP.

5.1 Cycle 1 – Gestion des serveurs (CRUD)
Cas d’usage
Gestion des serveurs

Objectif
Permettre à l’administrateur de gérer dynamiquement les serveurs à sauvegarder.

Données d’un serveur
Nom

Adresse IP

Login SSH

Répertoire(s) à sauvegarder

Fonctionnalités implémentées (CRUD)
Action	Description
Create	Création d’un serveur via formulaire
Read	Affichage de la liste des serveurs
Update	Modification des informations serveur
Delete	Suppression d’un serveur
Architecture technique
Model : classe Serveur

Controller : gestion des requêtes CRUD

DAO : persistance via fichiers JSON

View : formulaires et tableaux dynamiques

Tests définis en amont
Tests unitaires
IP valide / invalide

Champs obligatoires

Création d’un serveur valide

Tests d’intégration
Soumission du formulaire → serveur ajouté

Modification → données mises à jour

Suppression → serveur retiré de la liste

5.2 Cycle 2 – Sauvegarde nominale
Objectif
Réaliser une sauvegarde réelle dans un cas nominal.

Implémentation
Script bash utilisant rsync

Exécution du script depuis le serveur applicatif

Communication SSH vers le serveur de test

Bouton « Lancer sauvegarde » fonctionnel

Test d’intégration
Bouton → script exécuté → fichiers copiés

5.3 Cycle 3 – Robustesse et suivi
Objectif
Gérer les situations d’erreur et améliorer la fiabilité.

Fonctionnalités
Gestion IP invalide

Gestion serveur inaccessible

Gestion erreur SSH

Enregistrement des résultats de sauvegarde

Vue État / Historique

Tests
Tests d’échec (cas non nominaux)

Tests d’affichage

6. Phase de Transition – Livraison
Actions réalisées
Tests finaux

Vérification de toutes les fonctionnalités

Rédaction du rapport

Préparation du diaporama

Validation finale du projet

7. Répartition précise des rôles
Membre	Responsabilités
Nicolas	Backend, logique métier, scripts rsync
Car Timeo	Interface web, formulaires, affichage
Abde	Analyse, tests, méthode UP, Gantt, rapport
8. Conclusion
Le projet ShieldBackup respecte intégralement la méthodologie Unified Process.
L’approche itérative a permis :

une validation précoce de l’architecture,

une implémentation progressive des fonctionnalités,

une gestion rigoureuse des tests.

L’application finale permet la gestion complète des serveurs, le lancement de sauvegardes, et la consultation des résultats, constituant une base solide pour des évolutions futures.
