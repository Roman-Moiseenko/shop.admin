import { ElMessage } from 'element-plus'
import type { MessageOptions, MessageHandler } from 'element-plus'

export function useMessage() {
    // Стандартные настройки, применяемые ко всем сообщениям
    const baseDefaults: Partial<MessageOptions> = {
        showClose: true,
        grouping: true,
    }

    // Создаёт новые опции, не мутируя исходный объект
    function mergeOptions(
        options?: string | Partial<MessageOptions>,
        extra?: Partial<MessageOptions>
    ): MessageOptions {
        const base: MessageOptions =
            typeof options === 'string'
                ? { message: options }
                : { ...options }

        return {
            ...baseDefaults,
            ...base,
            ...extra,
        }
    }

    // Обобщённый метод с указанием типа
    function show(
        type: 'success' | 'warning' | 'info' | 'error' | '',
        options?: string | Partial<MessageOptions>
    ): MessageHandler {
        const merged = mergeOptions(
            options,
            type === 'error' ? { duration: 5500 } : {}
        )
        return ElMessage[type || 'info'](merged)
    }

    // Методы-ярлыки для конкретных типов
    const success = (options?: string | Partial<MessageOptions>) =>
        show('success', options)
    const warning = (options?: string | Partial<MessageOptions>) =>
        show('warning', options)
    const info = (options?: string | Partial<MessageOptions>) =>
        show('info', options)
    const error = (options?: string | Partial<MessageOptions>) =>
        show('error', options)
    const primary = (options?: string | Partial<MessageOptions>) =>
        ElMessage.primary(mergeOptions(options)) // primary не поддерживается show, оставляем отдельно

    // Закрыть все сообщения
    const closeAll = () => ElMessage.closeAll()

    return {
        show,
        success,
        warning,
        info,
        error,
        primary,
        closeAll,
    }
}