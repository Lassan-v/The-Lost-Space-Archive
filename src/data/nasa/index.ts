import catalog from './NASA_Data.json';
import type { FactCardData } from '../../types';

interface NasaFactRecord {
  fact_id: string;
  text?: string;
  source_id: string;
  category?: string;
}

export interface NasaObjectRecord {
  object_id: string;
  canonical_name?: string;
  source_ids: string[];
  verified_nssdca_facts?: NasaFactRecord[];
  verified_facts?: NasaFactRecord[];
}

interface NasaSourceRecord {
  source_id: string;
  title: string;
  url: string;
}

interface NasaCatalog {
  objects: NasaObjectRecord[];
  sources: NasaSourceRecord[];
}

const nasaCatalog = catalog as NasaCatalog;

function getSource(sourceId: string): NasaSourceRecord {
  const source = nasaCatalog.sources.find((entry) => entry.source_id === sourceId);
  if (!source) {
    throw new Error(`NASA catalog source not found: ${sourceId}`);
  }
  return source;
}

function getObject(objectId: string): NasaObjectRecord {
  const object = nasaCatalog.objects.find((entry) => entry.object_id === objectId);
  if (!object) {
    throw new Error(`NASA catalog object not found: ${objectId}`);
  }
  return object;
}

/** Facts reviewed against the cited primary NSSDCA mission page. */
export function getVerifiedFacts(objectId: string): FactCardData[] {
  const object = getObject(objectId);
  const facts = [...(object.verified_nssdca_facts ?? []), ...(object.verified_facts ?? [])];

  return facts.map((fact) => {
    const source = getSource(fact.source_id);
    return { factId: fact.fact_id, category: fact.category, fact: fact.text ?? '', sourceId: fact.source_id, sourceUrl: source.url };
  });
}

const DOSSIER_ALIASES: Record<string, string> = {
  'sojourner-mpf': 'mars_sojourner',
  'ingenuity-mh': 'mars_ingenuity',
  'surveyor-3': 'moon_surveyor3',
  'apollo17-lrv-3': 'moon_apollo17_lrv',
  mars_mer_rovers: 'mars_mer_rovers',
};

export function getDossierObjects(routeId: string, selectedObjectId?: string | null): NasaObjectRecord[] {
  const dossierId = DOSSIER_ALIASES[routeId] ?? routeId;
  const dossier = (catalog as NasaCatalog & { dossiers: { dossier_id: string; object_ids: string[] }[] })
    .dossiers.find((entry) => entry.dossier_id === dossierId);
  if (!dossier) return [];
  const selectedObjects = selectedObjectId
    ? dossier.object_ids.filter((objectId) => objectId === selectedObjectId)
    : dossier.object_ids;
  return selectedObjects.filter((objectId) => !objectId.includes('apollo15') && !objectId.includes('apollo16'))
    .map((objectId) => getObject(objectId));
}

export function getObjectCanonicalName(objectId: string): string {
  return getObject(objectId).canonical_name ?? objectId;
}

export function getDossierSourceIds(routeId: string, selectedObjectId?: string | null): string[] {
  return [...new Set(getDossierObjects(routeId, selectedObjectId).flatMap((object) =>
    [...(object.verified_nssdca_facts ?? []), ...(object.verified_facts ?? [])].map((fact) => fact.source_id)
  ))];
}

/** Source references recorded for an object in the structured catalog. */
export function getObjectSourceIds(objectId: string): string[] {
  return [...getObject(objectId).source_ids];
}

export function getObjectName(objectId: string): string | undefined {
  return nasaCatalog.objects.find((entry) => entry.object_id === objectId)?.canonical_name;
}

export function getSourceUrl(sourceId: string): string {
  return getSource(sourceId).url;
}

export const SOJOURNER_OBJECT_ID = 'mars_sojourner';
