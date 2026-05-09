const URL = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const h = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
}

async function req(url, options = {}) {
  const res = await fetch(url, options)
  const body = await res.json().catch(() => null)
  return res.ok ? { data: body, error: null } : { data: null, error: body }
}

export const supabase = {
  from(table) {
    const base = `${URL}/rest/v1/${table}`
    return {
      select(cols = '*') {
        let url = `${base}?select=${cols}`
        return {
          eq(col, val) {
            url += `&${col}=eq.${encodeURIComponent(val)}`
            return {
              single() {
                return req(url, { headers: { ...h, Accept: 'application/vnd.pgrst.object+json' } })
              },
            }
          },
        }
      },
      insert(body) {
        return req(base, { method: 'POST', headers: h, body: JSON.stringify(body) })
      },
      update(body) {
        return {
          eq(col, val) {
            return req(`${base}?${col}=eq.${encodeURIComponent(val)}`, {
              method: 'PATCH',
              headers: h,
              body: JSON.stringify(body),
            })
          },
        }
      },
    }
  },
  storage: {
    from(bucket) {
      return {
        async upload(path, file, opts = {}) {
          const res = await fetch(`${URL}/storage/v1/object/${bucket}/${path}`, {
            method: 'PUT',
            headers: {
              apikey: KEY,
              Authorization: `Bearer ${KEY}`,
              'Content-Type': opts.contentType || file.type,
              'x-upsert': 'true',
            },
            body: file,
          })
          return res.ok ? { error: null } : { error: await res.json() }
        },
        getPublicUrl(path) {
          return { data: { publicUrl: `${URL}/storage/v1/object/public/${bucket}/${path}` } }
        },
      }
    },
  },
}
