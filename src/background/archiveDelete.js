/**
 * perma-extension
 * @module background/archiveDelete
 * @author The Harvard Library Innovation Lab
 * @license MIT
 * @description Handler for the `ARCHIVE_DELETE` runtime message.
 */
// @ts-check

import { PermaAPI } from "@harvard-lil/perma-js-sdk";
import { Auth, Status } from "../storage/index.js";
import { archivePullTimeline } from "./archivePullTimeline.js";

/**
 * Handler for the `ARCHIVE_DELETE` runtime message: 
 * Tries to delete an archive.
 * Automatically updates timeline for the current tab.
 * 
 * @param {string} guid
 * @returns {Promise<void>}
 * @async
 */
export async function archiveDelete(guid) {
  const status = await Status.fromStorage();
  const auth = await Auth.fromStorage();

  try {
    status.isLoading = true;
    await status.save();

    const api = new PermaAPI(String(auth.apiKey));

    await api.deleteArchive(guid);

    status.message = "status_archive_deleted";
    
    await archivePullTimeline(); // Will update the timeline once the archive is created
  }
  catch(err) {
    status.message = "error_deleting_archive";
    //console.error(err);
    throw err;
  }
  finally {
    status.isLoading = false;
    await status.save();
  }
}
