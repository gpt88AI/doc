import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import {
  parseInboundAcquisition,
  relayAcquisitionToAgentUrl,
  type AcquisitionRelay,
} from '../../lib/activationAttribution'

export function ActivationAttributionRelay() {
  const location = useLocation()
  const acquisitionRef = useRef<AcquisitionRelay | null>(null)

  useEffect(() => {
    const inbound = parseInboundAcquisition(location.search)
    if (inbound && !acquisitionRef.current) acquisitionRef.current = inbound
    const acquisition = acquisitionRef.current
    if (!acquisition) return

    const root = document.getElementById('root')
    if (!root) return

    const rewriteAnchor = (anchor: HTMLAnchorElement) => {
      const relayedHref = relayAcquisitionToAgentUrl(anchor.href, acquisition)
      if (relayedHref !== anchor.href) anchor.href = relayedHref
    }
    const rewriteAddedTree = (node: Node) => {
      if (!(node instanceof Element)) return
      if (node.matches('a[href]')) rewriteAnchor(node as HTMLAnchorElement)
      node.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(rewriteAnchor)
    }

    rewriteAddedTree(root)
    const observer = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(rewriteAddedTree))
    })
    observer.observe(root, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [location.pathname, location.search])

  return null
}
