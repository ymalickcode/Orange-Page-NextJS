import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  // Récupérer le référent de la requête
  const referer = req.headers.referer;

  // Vérifier si le référent est celui attendu
  if (!referer || !referer.includes('/api/open')) {
    return res.status(403).send('Accès refusé');
  }

  try {
    // Récupérer le chemin absolu vers le fichier mysite.html
    const filePath = path.join(process.cwd(), 'public', 'orange.html');

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
