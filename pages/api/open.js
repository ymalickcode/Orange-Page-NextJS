import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  try {
    // Récupérer le chemin absolu vers le fichier mysite.html
    const filePath = path.join(process.cwd(), 'public', 'open.html');

    // Lire le contenu du fichier
    const htmlContent = await fs.readFile(filePath, 'utf8');

    // Définir l'en-tête Content-Type pour du HTML
    res.setHeader('Content-Type', 'text/html');

    // Envoyer le contenu du fichier HTML
    res.status(200).send(htmlContent);
  } catch (error) {
    console.error('Erreur lors du chargement du fichier HTML :', error);
    res.status(500).send('Erreur interne du serveur');
  }
}
